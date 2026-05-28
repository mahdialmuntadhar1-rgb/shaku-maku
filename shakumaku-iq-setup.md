# Shako Maku .iq Domain Setup Guide

## 🎯 Domain: shakumaku.iq

## 📋 .iq Domain Requirements

### ✅ What You Need:
- **No local presence required** - Can register from anywhere
- **Individual or legal entity** - Both are eligible
- **Domain length**: 3-63 characters (✅ shakumaku = 9 chars)
- **Processing time**: 2 days
- **Registration term**: 1-2 years

### 📝 Registration Requirements:
- Domain must comply with Iraqi cultural and legal standards
- No trademark infringement
- No offensive content
- Prior rights to domain name required

## 🛒 Recommended Registrars

### 1. **101domain.com** ⭐ (Recommended)
- URL: https://www.101domain.com/iq.htm
- Good for international customers
- English support
- Handles .iq requirements

### 2. **AsiaRegister.com**
- URL: https://www.asiaregister.com/en/domains/iq-domain-registration
- Asian market focus
- Competitive pricing

### 3. **Register.Domains**
- URL: https://register.domains/en/dm/iq-domains-in-iraq
- Specialized in country domains

## 🔧 Step-by-Step Registration Process

### Step 1: Check Availability
1. Go to chosen registrar
2. Search for "shakumaku.iq"
3. Verify it's available

### Step 2: Registration
1. Create account with registrar
2. Provide ownership information
3. Pay registration fee (typically $50-100/year)
4. Wait 2 days for processing

### Step 3: DNS Configuration
1. Access domain management panel
2. Set up DNS records for Cloudflare Workers
3. Configure CNAME or A records

## 🌐 DNS Configuration for Cloudflare Workers

### Option 1: CNAME Record (Recommended)
```
Type: CNAME
Name: @ (or shakumaku)
Value: billboard3dnakedeye-mor.mahdialmuntadhar1.workers.dev
TTL: 3600
```

### Option 2: A Record (if you have dedicated IP)
```
Type: A
Name: @
Value: [Cloudflare Workers IP]
TTL: 3600
```

## 🔧 Cloudflare Workers Configuration

### Update wrangler.jsonc
```json
{
  "routes": [
    { "pattern": "shakumaku.iq/*", "zone_name": "shakumaku.iq" }
  ]
}
```

## 📱 Application Updates

### Update Firebase Config
- Update authDomain to "shakumaku.iq"
- Update any hardcoded URLs
- Update PWA manifest

### Update PWA Manifest
```json
{
  "start_url": "https://shakumaku.iq/",
  "scope": "https://shakumaku.iq/",
  "id": "https://shakumaku.iq/"
}
```

## ⚡ Quick Start Actions

### Immediate Actions:
1. ✅ Choose registrar (recommend 101domain.com)
2. ✅ Register shakumaku.iq
3. ✅ Configure DNS for Cloudflare Workers
4. ✅ Update application URLs
5. ✅ Test new domain

### Timeline:
- **Day 1**: Register domain
- **Day 2-3**: Domain processed and active
- **Day 3**: DNS propagation
- **Day 4**: Full deployment on shakumaku.iq

## 🎉 Expected Results

Once complete:
- **Professional Iraqi identity** with .iq domain
- **Better SEO** for Iraqi business searches
- **Increased trust** from Iraqi users
- **Memorable URL** for your business directory
- **PWA functionality** with proper domain

## 📞 Support Contact

If you need help with:
- Domain registration: Contact registrar support
- DNS configuration: Cloudflare Workers documentation
- Application updates: I can help with code changes

Ready to proceed with registration?
