# Register shakumaku.iq through Cloudflare Registrar

## 🌐 Cloudflare Registrar - Best Choice!

### ✅ Why Cloudflare is Perfect:
- **At-cost pricing** - No markup fees
- **Free WHOIS privacy** - Personal info protected
- **Built-in security** - DNSSEC, domain lock
- **Easy integration** - Direct DNS management
- **No upsells** - Transparent pricing

## 🔧 Step-by-Step Registration

### Step 1: Check Domain Availability
1. Go to: https://domains.cloudflare.com/
2. Search for: `shakumaku.iq`
3. Check if available

### Step 2: Register Through Cloudflare
1. **Login** to your Cloudflare dashboard
2. **Navigate** to Domain Registrar
3. **Search** for `shakumaku.iq`
4. **Register** if available

### Step 3: Configure DNS
Since you're using Cloudflare Workers:
1. **Add CNAME record**:
   ```
   Type: CNAME
   Name: @
   Value: billboard3dnakedeye-mor.mahdialmuntadhar1.workers.dev
   TTL: Auto
   Proxy: Enabled (Orange cloud)
   ```

2. **Add WWW record**:
   ```
   Type: CNAME
   Name: www
   Value: billboard3dnakedeye-mor.mahdialmuntadhar1.workers.dev
   TTL: Auto
   Proxy: Enabled (Orange cloud)
   ```

## 📋 .iq Domain Requirements

### ✅ What You Need:
- **No local presence required** (Cloudflare handles this)
- **Individual or business** - Both eligible
- **Compliance** - Must follow Iraqi cultural standards
- **Processing time** - 2-3 days

### 📝 Documentation:
Cloudflare may require:
- **Contact verification** - Email confirmation
- **Identity verification** - Standard ICANN requirements
- **Compliance check** - Cultural/religious standards

## 🎯 Alternative: Cloudflare + External Registrar

If .iq isn't available through Cloudflare:

### Option 1: Register elsewhere, point to Cloudflare
1. **Register** at 101domain.com or other registrar
2. **Change nameservers** to Cloudflare:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
3. **Manage DNS** through Cloudflare dashboard

### Option 2: Use Cloudflare as DNS only
1. **Register** domain anywhere
2. **Add to Cloudflare** as external domain
3. **Configure DNS** records

## 🔧 Cloudflare Workers Integration

### Update wrangler.jsonc after registration:
```json
{
  "routes": [
    { "pattern": "shakumaku.iq/*", "zone_name": "shakumaku.iq" }
  ]
}
```

### Deploy with custom domain:
```bash
npm run deploy
```

## 💰 Pricing Comparison

### Cloudflare Registrar:
- **Cost**: Wholesale price (~$30-50/year)
- **Renewal**: Same price (no markup)
- **Privacy**: Free
- **Security**: Free

### Other Registrars:
- **Cost**: $50-100/year
- **Renewal**: Often higher
- **Privacy**: Usually extra cost
- **Security**: Basic

## 🚀 Quick Start

### Immediate Actions:
1. ✅ **Check availability** at domains.cloudflare.com
2. ✅ **Register** if available
3. ✅ **Configure DNS** for Cloudflare Workers
4. ✅ **Update wrangler.jsonc** with custom routes
5. ✅ **Deploy** with new domain

## 📞 Support

### If issues arise:
- **Cloudflare Support**: Through dashboard
- **Documentation**: developers.cloudflare.com/registrar
- **Community**: Cloudflare community forums

## 🎉 Benefits of Cloudflare + .iq

- **🇮🇶 Iraqi identity** with .iq domain
- **🔒 Maximum security** with Cloudflare
- **💰 Best pricing** - no markup fees
- **⚡ Fast DNS** - Cloudflare network
- **🛡️ DDoS protection** - Built-in
- **📊 Analytics** - Traffic insights

Ready to check shakumaku.iq availability on Cloudflare?
