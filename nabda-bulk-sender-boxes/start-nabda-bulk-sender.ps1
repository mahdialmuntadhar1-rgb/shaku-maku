param(
  [int]$Port = 8788
)

$ErrorActionPreference = "Stop"
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$IndexFile = Join-Path $Here "index.html"

Write-Host ""
Write-Host "Nabda Local Bulk Sender Server" -ForegroundColor Cyan
Write-Host "This API key is kept only in this PowerShell session. It is not written to the HTML file." -ForegroundColor Yellow
Write-Host ""

$SecureKey = Read-Host "Paste your Nabda API key" -AsSecureString
$BSTR = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureKey)
$ApiKey = [Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

$listener = [System.Net.HttpListener]::new()
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
} catch {
  Write-Host "Could not start server on $prefix" -ForegroundColor Red
  Write-Host "Try running PowerShell as Administrator, or change the port." -ForegroundColor Yellow
  throw
}

Start-Process $prefix
Write-Host ""
Write-Host "Sender opened: $prefix" -ForegroundColor Green
Write-Host "Keep this PowerShell window open while sending." -ForegroundColor Yellow
Write-Host "Press CTRL+C to stop." -ForegroundColor Yellow
Write-Host ""

function Send-TextResponse($ctx, [int]$status, [string]$text, [string]$type = "text/plain; charset=utf-8") {
  $bytes = [Text.Encoding]::UTF8.GetBytes($text)
  $ctx.Response.StatusCode = $status
  $ctx.Response.ContentType = $type
  $ctx.Response.Headers.Add("Access-Control-Allow-Origin", "*")
  $ctx.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
  $ctx.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $ctx.Response.Close()
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $path = $req.Url.AbsolutePath.ToLowerInvariant()

  try {
    if ($req.HttpMethod -eq "OPTIONS") {
      Send-TextResponse $ctx 200 "OK"
      continue
    }

    if ($req.HttpMethod -eq "GET" -and ($path -eq "/" -or $path -eq "/index.html")) {
      $html = Get-Content -LiteralPath $IndexFile -Raw -Encoding UTF8
      Send-TextResponse $ctx 200 $html "text/html; charset=utf-8"
      continue
    }

    if ($req.HttpMethod -eq "GET" -and $path -eq "/health") {
      Send-TextResponse $ctx 200 '{"ok":true}' "application/json; charset=utf-8"
      continue
    }

    if ($req.HttpMethod -eq "POST" -and $path -eq "/send") {
      $reader = [IO.StreamReader]::new($req.InputStream, $req.ContentEncoding)
      $bodyText = $reader.ReadToEnd()
      $body = $bodyText | ConvertFrom-Json

      $phone = [string]$body.phone
      $message = [string]$body.message

      if ([string]::IsNullOrWhiteSpace($phone) -or [string]::IsNullOrWhiteSpace($message)) {
        Send-TextResponse $ctx 400 '{"success":false,"error":"phone and message are required"}' "application/json; charset=utf-8"
        continue
      }

      $payload = @{
        phone = $phone
        message = $message
      } | ConvertTo-Json -Depth 10

      $headers = @{
        Authorization = $ApiKey
      }

      try {
        $nabda = Invoke-RestMethod `
          -Uri "https://api.nabdaotp.com/api/v1/messages/send" `
          -Method POST `
          -Headers $headers `
          -ContentType "application/json; charset=utf-8" `
          -Body $payload `
          -TimeoutSec 60

        $json = $nabda | ConvertTo-Json -Depth 20
        Send-TextResponse $ctx 200 $json "application/json; charset=utf-8"
      } catch {
        $err = $_.Exception.Message
        $safe = @{ success = $false; error = $err } | ConvertTo-Json
        Send-TextResponse $ctx 500 $safe "application/json; charset=utf-8"
      }

      continue
    }

    Send-TextResponse $ctx 404 "Not found"
  } catch {
    $err = $_.Exception.Message
    Send-TextResponse $ctx 500 $err
  }
}
