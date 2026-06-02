$ErrorActionPreference = "Continue"

$NabdaEmail = "shkar9441@gmail.com"
$NabdaPassword = Read-Host "Enter your Nabda password carefully"

$InstanceId = "4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
$Phone = "+9647704413300"
$Message = "Nabda OTP clean test"

$LoginUrl = "https://api.nabdaotp.com/api/v1/auth/login"
$SelectInstanceUrl = "https://api.nabdaotp.com/api/v1/auth/select-instance"

function Show-ErrorBody {
    param($err)

    try {
        $status = $err.Exception.Response.StatusCode.value__
        Write-Host "HTTP $status" -ForegroundColor Yellow

        $reader = New-Object System.IO.StreamReader($err.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host $errorBody -ForegroundColor Yellow
    } catch {
        Write-Host $err.Exception.Message -ForegroundColor Yellow
    }
}

Write-Host "`nSTEP 1: LOGIN" -ForegroundColor Cyan

try {
    $loginBody = @{
        email = $NabdaEmail
        password = $NabdaPassword
    } | ConvertTo-Json -Depth 10

    $loginRes = Invoke-WebRequest `
        -Uri $LoginUrl `
        -Method POST `
        -Headers @{
            "Content-Type" = "application/json"
            "Accept" = "application/json"
        } `
        -Body $loginBody `
        -UseBasicParsing `
        -TimeoutSec 30

    Write-Host "✅ LOGIN OK HTTP $($loginRes.StatusCode)" -ForegroundColor Green

    $loginJson = $loginRes.Content | ConvertFrom-Json
    $LoginToken = $loginJson.data.accessToken

    if (!$LoginToken) {
        Write-Host "❌ Login worked but no accessToken found." -ForegroundColor Red
        Write-Host $loginRes.Content
        Read-Host "Press Enter to close"
        exit
    }

} catch {
    Write-Host "❌ LOGIN FAILED" -ForegroundColor Red
    Show-ErrorBody $_
    Read-Host "Press Enter to close"
    exit
}

Write-Host "`nSTEP 2: SELECT INSTANCE" -ForegroundColor Cyan

try {
    $selectBody = @{
        instanceId = $InstanceId
    } | ConvertTo-Json -Depth 10

    $selectRes = Invoke-WebRequest `
        -Uri $SelectInstanceUrl `
        -Method POST `
        -Headers @{
            "Authorization" = "Bearer $LoginToken"
            "Content-Type" = "application/json"
            "Accept" = "application/json"
        } `
        -Body $selectBody `
        -UseBasicParsing `
        -TimeoutSec 30

    Write-Host "✅ SELECT INSTANCE OK HTTP $($selectRes.StatusCode)" -ForegroundColor Green

    $selectJson = $selectRes.Content | ConvertFrom-Json
    $InstanceToken = $selectJson.data.accessToken

    if (!$InstanceToken) {
        Write-Host "❌ Select instance worked but no instance accessToken found." -ForegroundColor Red
        Write-Host $selectRes.Content
        Read-Host "Press Enter to close"
        exit
    }

    Write-Host "✅ INSTANCE TOKEN FOUND" -ForegroundColor Green

} catch {
    Write-Host "❌ SELECT INSTANCE FAILED" -ForegroundColor Red
    Show-ErrorBody $_
    Read-Host "Press Enter to close"
    exit
}

Write-Host "`nSTEP 3: TEST SEND ENDPOINTS" -ForegroundColor Cyan

$sendBodies = @(
    @{
        Name = "phone_message"
        Body = @{
            phone = $Phone
            message = $Message
        }
    },
    @{
        Name = "phoneNumber_message"
        Body = @{
            phoneNumber = $Phone
            message = $Message
        }
    },
    @{
        Name = "to_message"
        Body = @{
            to = $Phone
            message = $Message
        }
    },
    @{
        Name = "number_message"
        Body = @{
            number = $Phone
            message = $Message
        }
    },
    @{
        Name = "mobile_message"
        Body = @{
            mobile = $Phone
            message = $Message
        }
    },
    @{
        Name = "phone_text"
        Body = @{
            phone = $Phone
            text = $Message
        }
    },
    @{
        Name = "phone_body"
        Body = @{
            phone = $Phone
            body = $Message
        }
    }
)

$sendUrls = @(
    "https://api.nabdaotp.com/api/v1/messages/send",
    "https://api.nabdaotp.com/api/v1/messages",
    "https://api.nabdaotp.com/api/v1/message/send",
    "https://api.nabdaotp.com/api/v1/whatsapp/messages/send",
    "https://api.nabdaotp.com/api/v1/whatsapp/send"
)

$authModes = @(
    @{
        Name = "Bearer instance token"
        Headers = @{
            "Authorization" = "Bearer $InstanceToken"
            "Content-Type" = "application/json"
            "Accept" = "application/json"
        }
    },
    @{
        Name = "Bearer login token"
        Headers = @{
            "Authorization" = "Bearer $LoginToken"
            "Content-Type" = "application/json"
            "Accept" = "application/json"
        }
    },
    @{
        Name = "x-instance-token"
        Headers = @{
            "x-instance-token" = "$InstanceToken"
            "Content-Type" = "application/json"
            "Accept" = "application/json"
        }
    }
)

$found = $false

foreach ($url in $sendUrls) {
    if ($found) { break }

    foreach ($auth in $authModes) {
        if ($found) { break }

        foreach ($bodyItem in $sendBodies) {
            if ($found) { break }

            $json = $bodyItem.Body | ConvertTo-Json -Depth 10

            Write-Host "`nTesting:" -ForegroundColor Cyan
            Write-Host "URL: $url"
            Write-Host "Auth: $($auth.Name)"
            Write-Host "Body: $($bodyItem.Name)"
            Write-Host $json

            try {
                $sendRes = Invoke-WebRequest `
                    -Uri $url `
                    -Method POST `
                    -Headers $auth.Headers `
                    -Body $json `
                    -UseBasicParsing `
                    -TimeoutSec 30

                Write-Host "`n✅ MESSAGE SENT / SUCCESS HTTP $($sendRes.StatusCode)" -ForegroundColor Green
                Write-Host $sendRes.Content

                Write-Host "`nUSE THIS IN YOUR APP:" -ForegroundColor Green
                Write-Host "URL: $url" -ForegroundColor Yellow
                Write-Host "Auth: $($auth.Name)" -ForegroundColor Yellow
                Write-Host "Body: $($bodyItem.Name)" -ForegroundColor Yellow
                Write-Host $json -ForegroundColor Yellow

                $found = $true
                break

            } catch {
                Write-Host "❌ Failed" -ForegroundColor Red
                Show-ErrorBody $_
            }
        }
    }
}

if (!$found) {
    Write-Host "`n❌ LOGIN AND INSTANCE SELECTION WORK, BUT SEND STILL FAILED." -ForegroundColor Red
    Write-Host "This means we need the exact Send Message example from Nabda > API Docs." -ForegroundColor Yellow
}

Read-Host "Press Enter to close"
