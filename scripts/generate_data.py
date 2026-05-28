import csv
import json
import random
from datetime import datetime, timedelta

csv_path = r'C:\Users\HB LAPTOP STORE\Documents\puython-pro-scraper\iraq_businesses_2026-05-26_122423.csv'
out_businesses = r'c:\Users\HB LAPTOP STORE\.windsurf\billboard3dnakedeye-mor\public\iraq_businesses.json'
out_posts = r'c:\Users\HB LAPTOP STORE\.windsurf\billboard3dnakedeye-mor\public\iraq_posts.json'
out_csv_data = r'c:\Users\HB LAPTOP STORE\.windsurf\billboard3dnakedeye-mor\src\csvData.ts'

category_images = {
    'IT & Software Services': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    'Hotels & Hospitality': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    'Health & Medical Services': 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    'Fitness & Gyms': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    'Education & Training Centers': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    'Restaurants & Cafes': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    'Real Estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    'Construction & Contractors': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    'Beauty & Salons': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    'Electronics & Tech Shops': 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80'
}

category_icons = {
    'IT & Software Services': 'Monitor',
    'Hotels & Hospitality': 'Hotel',
    'Health & Medical Services': 'HeartPulse',
    'Fitness & Gyms': 'Dumbbell',
    'Education & Training Centers': 'GraduationCap',
    'Restaurants & Cafes': 'Coffee',
    'Real Estate': 'Building2',
    'Construction & Contractors': 'HardHat',
    'Beauty & Salons': 'Scissors',
    'Electronics & Tech Shops': 'Smartphone'
}

category_colors = {
    'IT & Software Services': 'bg-cyan-500',
    'Hotels & Hospitality': 'bg-amber-500',
    'Health & Medical Services': 'bg-rose-500',
    'Fitness & Gyms': 'bg-orange-500',
    'Education & Training Centers': 'bg-indigo-500',
    'Restaurants & Cafes': 'bg-emerald-500',
    'Real Estate': 'bg-blue-500',
    'Construction & Contractors': 'bg-yellow-600',
    'Beauty & Salons': 'bg-pink-500',
    'Electronics & Tech Shops': 'bg-violet-500'
}

random.seed(42)

def safe_float(val):
    try:
        return float(val) if val else 0
    except:
        return 0

def slugify(text):
    return text.lower().replace(' & ', '_').replace(' ', '_').replace('-', '_')

def clean_phone(val):
    if not val:
        return ''
    v = str(val).strip()
    if v == '9.65E+12':
        return ''
    return v

categories = set()
governorates = set()
businesses = []
posts = []

with open(csv_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    # Strip whitespace from fieldnames
    reader.fieldnames = [fn.strip() for fn in reader.fieldnames]
    for i, row in enumerate(reader):
        cat = row['category']
        gov = row['governorate']
        categories.add(cat)
        governorates.add(gov)
        
        cat_id = slugify(cat)
        gov_id = slugify(gov)
        if gov_id == 'tikrit':
            gov_id = 'saladin'
        
        lang = row['language']
        name = row['name']
        address = row['address']
        bio = row['bio']
        
        biz = {
            'id': f'csv_{i}',
            'name': {'ar': name if lang == 'ar' else '', 'ku': name if lang == 'ku' else '', 'en': name if lang == 'en' else ''},
            'description': {'ar': bio if lang == 'ar' else '', 'ku': bio if lang == 'ku' else '', 'en': bio if lang == 'en' else ''},
            'category': cat_id,
            'governorate': gov_id,
            'rating': round(3.5 + random.random() * 1.5, 1),
            'reviewsCount': random.randint(2, 30),
            'image': category_images.get(cat, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'),
            'images': [category_images.get(cat, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80')],
            'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            'isVerified': random.random() > 0.7,
            'phoneNumber': clean_phone(row['phone']) or clean_phone(row['mobile']),
            'address': {'ar': address if lang == 'ar' else '', 'ku': address if lang == 'ku' else '', 'en': address if lang == 'en' else ''},
            'likes': random.randint(10, 200),
            'saves': random.randint(5, 50),
            'mapCoords': {'x': random.randint(10, 90), 'y': random.randint(10, 90)},
            'stories': []
        }
        businesses.append(biz)
        
        time_hours = random.randint(1, 48)
        created = datetime.now() - timedelta(hours=time_hours)
        post = {
            'id': f'post_{i}',
            'businessId': f'csv_{i}',
            'businessName': name,
            'businessAvatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            'category': cat_id,
            'governorate': gov_id,
            'mediaUrl': category_images.get(cat, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'),
            'caption': {'ar': bio if lang == 'ar' else '', 'ku': bio if lang == 'ku' else '', 'en': bio if lang == 'en' else ''},
            'likes': random.randint(20, 500),
            'commentsCount': random.randint(3, 50),
            'shares': random.randint(1, 30),
            'timeAgo': {'ar': f'قبل {time_hours} ساعة', 'ku': f'پێش {time_hours} کاتژمێر', 'en': f'{time_hours}h ago'},
            'comments': [],
            'likedByUser': False,
            'savedByUser': False
        }
        posts.append(post)

# Write JSON files
with open(out_businesses, 'w', encoding='utf-8') as f:
    json.dump(businesses, f, ensure_ascii=False, indent=2)

with open(out_posts, 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

# Generate TypeScript data file
cat_entries = []
for cat in sorted(categories):
    cat_id = slugify(cat)
    icon = category_icons.get(cat, 'Briefcase')
    color = category_colors.get(cat, 'bg-amber-500')
    cat_entries.append(f"  {{ id: '{cat_id}', name: '{cat}', nameAr: '{cat}', nameKu: '{cat}', icon: '{icon}', color: '{color}' }}")

# Governorate mapping - use standard codes
gov_entries = []
gov_map = {
    'baghdad': 'Baghdad',
    'basra': 'Basra',
    'nineveh': 'Nineveh',
    'kirkuk': 'Kirkuk',
    'diyala': 'Diyala',
    'anbar': 'Anbar',
    'karbala': 'Karbala',
    'najaf': 'Najaf',
    'maysan': 'Maysan',
    'muthanna': 'Muthanna',
    'qadisiyyah': 'Qadisiyyah',
    'babil': 'Babil',
    'wasit': 'Wasit',
    'erbil': 'Erbil',
    'sulaymaniyah': 'Sulaymaniyah',
    'dohuk': 'Dohuk',
    'halabja': 'Halabja',
    'saladin': 'Saladin',
    'tikrit': 'Saladin'
}

for gov_id, gov_name in sorted(gov_map.items()):
    gov_entries.append(f"  {{ id: '{gov_id}', name: '{gov_name}', nameAr: '{gov_name}', nameKu: '{gov_name}' }}")

csv_ts = f"""import type {{ Business, SocialPost }} from './types';

export const CSV_CATEGORIES = [
{',\n'.join(cat_entries)}
];

export const CSV_GOVERNORATES = [
{',\n'.join(gov_entries)}
];

export const CSV_BUSINESSES: Business[] = {json.dumps(businesses[:50], ensure_ascii=False, indent=2)};

export const CSV_POSTS: SocialPost[] = {json.dumps(posts[:50], ensure_ascii=False, indent=2)};
"""

with open(out_csv_data, 'w', encoding='utf-8') as f:
    f.write(csv_ts)

print(f'Categories: {len(categories)}')
print(f'Governorates: {len(governorates)}')
print(f'Total businesses: {len(businesses)}')
print(f'Total posts: {len(posts)}')
print(f'Wrote {out_businesses}')
print(f'Wrote {out_posts}')
print(f'Wrote {out_csv_data}')
