# FILTER TRUTH — DO NOT CONFUSE AGAIN

The business data is already organized in the database.

## Database table

Table:
businesses

Important columns:
- governorate
- category

Do NOT use:
- city
- province
- type
- business_category

Those columns do not exist.

## Total businesses

4595 businesses found in shaku_maku_db.

## Correct governorate values

The database uses English governorate values:

- Baghdad
- Basra
- Erbil
- Sulaymaniyah
- Duhok
- Nineveh
- Najaf
- Karbala
- Kirkuk
- Maysan
- Babil
- Diyala
- Wasit
- Anbar
- Muthanna
- Dhi Qar
- Qadisiyyah
- Salahaddin
- Halabja

Important:
Frontend may display Arabic/Kurdish names, but API must send English database value.

Example:
User sees: بغداد
API sends: Baghdad

## Correct category values

The database uses slug category values:

- education
- tourism
- real_estate
- atm
- beauty
- fuel
- restaurant
- pharmacy
- clinic
- mosque
- cafe
- gym
- hospital
- entertainment
- events
- market
- electronics
- services
- fashion
- bank
- restaurants_and_cafes
- home
- education_and_training_centers
- beauty_and_salons
- electronics_and_tech_shops
- construction_and_contractors
- health_and_medical_services
- hotels_and_hospitality
- fitness_and_gyms
- it_and_software_services
- amenity
- office
- shop
- craft

Important:
Frontend may display Arabic/Kurdish/English labels, but API must send slug values.

Example:
User sees: مطاعم
API sends: restaurant

User sees: صيدليات
API sends: pharmacy

User sees: عيادات
API sends: clinic

## Correct API behavior

Use:

/api/businesses?page=1&limit=20&governorate=Baghdad&category=restaurant

Rules:

- If governorate is ALL, do not send governorate.
- If category is ALL, do not send category.
- When governorate/category changes:
  - reset page to 1
  - clear old businesses
  - fetch new data
  - show loading
  - show results

## Confirmed tests

Works:
/api/businesses?page=1&limit=5
/api/businesses?page=1&limit=5&governorate=Baghdad

Does not work because values are wrong:
/api/businesses?page=1&limit=5&governorate=بغداد
/api/businesses?page=1&limit=5&category=مطاعم
/api/businesses?page=1&limit=5&category=Restaurants

## Required frontend fix

Create filter objects like this:

Governorates:
[
  { label_ar: "كل العراق", value: "ALL" },
  { label_ar: "بغداد", value: "Baghdad" },
  { label_ar: "البصرة", value: "Basra" },
  { label_ar: "أربيل", value: "Erbil" }
]

Categories:
[
  { label_ar: "الكل", value: "ALL" },
  { label_ar: "مطاعم", value: "restaurant" },
  { label_ar: "مقاهي", value: "cafe" },
  { label_ar: "صيدليات", value: "pharmacy" },
  { label_ar: "عيادات", value: "clinic" },
  { label_ar: "عقارات", value: "real_estate" }
]

## Social feed behavior

Social feed should use the same selected governorate.

If user selects Baghdad:
- businesses show Baghdad
- social feed shows Baghdad

If user selects Erbil:
- businesses show Erbil
- social feed shows Erbil

## Do not touch

Do not touch Nabda API.
Do not touch working bulk sender.
Do not change official live links.
Do not change database values unless intentionally doing a migration.
