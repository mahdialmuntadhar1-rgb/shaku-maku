export const GOVERNORATE_FILTERS = [
  { label_ar: "كل العراق", label_en: "All Iraq", value: "ALL" },
  { label_ar: "بغداد", label_en: "Baghdad", value: "Baghdad" },
  { label_ar: "البصرة", label_en: "Basra", value: "Basra" },
  { label_ar: "أربيل", label_en: "Erbil", value: "Erbil" },
  { label_ar: "السليمانية", label_en: "Sulaymaniyah", value: "Sulaymaniyah" },
  { label_ar: "دهوك", label_en: "Duhok", value: "Duhok" },
  { label_ar: "نينوى", label_en: "Nineveh", value: "Nineveh" },
  { label_ar: "النجف", label_en: "Najaf", value: "Najaf" },
  { label_ar: "كربلاء", label_en: "Karbala", value: "Karbala" },
  { label_ar: "كركوك", label_en: "Kirkuk", value: "Kirkuk" },
  { label_ar: "ميسان", label_en: "Maysan", value: "Maysan" },
  { label_ar: "بابل", label_en: "Babil", value: "Babil" },
  { label_ar: "ديالى", label_en: "Diyala", value: "Diyala" },
  { label_ar: "واسط", label_en: "Wasit", value: "Wasit" },
  { label_ar: "الأنبار", label_en: "Anbar", value: "Anbar" },
  { label_ar: "المثنى", label_en: "Muthanna", value: "Muthanna" },
  { label_ar: "ذي قار", label_en: "Dhi Qar", value: "Dhi Qar" },
  { label_ar: "القادسية", label_en: "Qadisiyyah", value: "Qadisiyyah" },
  { label_ar: "صلاح الدين", label_en: "Salahaddin", value: "Salahaddin" },
  { label_ar: "حلبجة", label_en: "Halabja", value: "Halabja" }
];

export const CATEGORY_FILTERS = [
  { label_ar: "الكل", label_en: "All", value: "ALL" },
  { label_ar: "مطاعم", label_en: "Restaurants", value: "restaurant" },
  { label_ar: "مطاعم وكافيهات", label_en: "Restaurants & Cafes", value: "restaurants_and_cafes" },
  { label_ar: "مقاهي", label_en: "Cafes", value: "cafe" },
  { label_ar: "صيدليات", label_en: "Pharmacies", value: "pharmacy" },
  { label_ar: "عيادات", label_en: "Clinics", value: "clinic" },
  { label_ar: "مستشفيات", label_en: "Hospitals", value: "hospital" },
  { label_ar: "عقارات", label_en: "Real Estate", value: "real_estate" },
  { label_ar: "تعليم", label_en: "Education", value: "education" },
  { label_ar: "سياحة", label_en: "Tourism", value: "tourism" },
  { label_ar: "جمال وصالونات", label_en: "Beauty", value: "beauty" },
  { label_ar: "محطات وقود", label_en: "Fuel", value: "fuel" },
  { label_ar: "مساجد", label_en: "Mosques", value: "mosque" },
  { label_ar: "رياضة", label_en: "Gyms", value: "gym" },
  { label_ar: "تسوق", label_en: "Markets", value: "market" },
  { label_ar: "إلكترونيات", label_en: "Electronics", value: "electronics" },
  { label_ar: "خدمات", label_en: "Services", value: "services" },
  { label_ar: "أزياء", label_en: "Fashion", value: "fashion" },
  { label_ar: "بنوك", label_en: "Banks", value: "bank" },
  { label_ar: "فنادق", label_en: "Hotels", value: "hotels_and_hospitality" },
  { label_ar: "مقاولات", label_en: "Construction", value: "construction_and_contractors" },
  { label_ar: "صحة وطب", label_en: "Health", value: "health_and_medical_services" },
  { label_ar: "منازل", label_en: "Home", value: "home" },
  { label_ar: "فعاليات", label_en: "Events", value: "events" },
  { label_ar: "ترفيه", label_en: "Entertainment", value: "entertainment" }
];

export function normalizeGovernorateFilter(value: string | null | undefined): string {
  if (!value) return "ALL";
  const v = String(value).trim();

  const map: Record<string, string> = {
    "all": "ALL",
    "ALL": "ALL",
    "كل العراق": "ALL",
    "العراق": "ALL",

    "بغداد": "Baghdad",
    "baghdad": "Baghdad",
    "Baghdad": "Baghdad",

    "البصرة": "Basra",
    "بصرة": "Basra",
    "basra": "Basra",
    "Basra": "Basra",

    "أربيل": "Erbil",
    "اربيل": "Erbil",
    "هەولێر": "Erbil",
    "erbil": "Erbil",
    "Erbil": "Erbil",

    "السليمانية": "Sulaymaniyah",
    "سليمانية": "Sulaymaniyah",
    "سلێمانی": "Sulaymaniyah",
    "sulaymaniyah": "Sulaymaniyah",
    "Sulaymaniyah": "Sulaymaniyah",

    "دهوك": "Duhok",
    "دهۆک": "Duhok",
    "Duhok": "Duhok",
    "Dohuk": "Duhok",

    "نينوى": "Nineveh",
    "الموصل": "Nineveh",
    "Nineveh": "Nineveh",
    "Mosul": "Nineveh",

    "النجف": "Najaf",
    "نجف": "Najaf",
    "Najaf": "Najaf",

    "كربلاء": "Karbala",
    "Karbala": "Karbala",

    "كركوك": "Kirkuk",
    "Kirkuk": "Kirkuk",

    "ميسان": "Maysan",
    "Maysan": "Maysan",

    "بابل": "Babil",
    "Babil": "Babil",

    "ديالى": "Diyala",
    "Diyala": "Diyala",

    "واسط": "Wasit",
    "Wasit": "Wasit",

    "الأنبار": "Anbar",
    "انبار": "Anbar",
    "Anbar": "Anbar",

    "المثنى": "Muthanna",
    "Muthanna": "Muthanna",

    "ذي قار": "Dhi Qar",
    "Dhi Qar": "Dhi Qar",

    "القادسية": "Qadisiyyah",
    "Qadisiyyah": "Qadisiyyah",

    "صلاح الدين": "Salahaddin",
    "Salahaddin": "Salahaddin",
    "Saladin": "Salahaddin",

    "حلبجة": "Halabja",
    "Halabja": "Halabja"
  };

  return map[v] || v;
}

export function normalizeCategoryFilter(value: string | null | undefined): string {
  if (!value) return "ALL";
  const v = String(value).trim();

  const map: Record<string, string> = {
    "all": "ALL",
    "ALL": "ALL",
    "الكل": "ALL",
    "كل التصنيفات": "ALL",

    "مطاعم": "restaurant",
    "مطعم": "restaurant",
    "Restaurants": "restaurant",
    "Restaurant": "restaurant",
    "restaurant": "restaurant",

    "مطاعم وكافيهات": "restaurants_and_cafes",
    "restaurants_and_cafes": "restaurants_and_cafes",

    "مقاهي": "cafe",
    "كافيه": "cafe",
    "Cafes": "cafe",
    "Cafe": "cafe",
    "cafe": "cafe",

    "صيدليات": "pharmacy",
    "صيدلية": "pharmacy",
    "Pharmacies": "pharmacy",
    "Pharmacy": "pharmacy",
    "pharmacy": "pharmacy",

    "عيادات": "clinic",
    "عيادة": "clinic",
    "Doctors": "clinic",
    "Clinics": "clinic",
    "Clinic": "clinic",
    "clinic": "clinic",

    "مستشفيات": "hospital",
    "Hospital": "hospital",
    "hospital": "hospital",

    "عقارات": "real_estate",
    "Real Estate": "real_estate",
    "real_estate": "real_estate",

    "تعليم": "education",
    "Education": "education",
    "education": "education",

    "سياحة": "tourism",
    "Tourism": "tourism",
    "tourism": "tourism",

    "جمال": "beauty",
    "صالونات": "beauty",
    "Beauty": "beauty",
    "beauty": "beauty",

    "وقود": "fuel",
    "Fuel": "fuel",
    "fuel": "fuel",

    "مساجد": "mosque",
    "Mosque": "mosque",
    "mosque": "mosque",

    "رياضة": "gym",
    "جيم": "gym",
    "Gyms": "gym",
    "Gym": "gym",
    "gym": "gym",

    "تسوق": "market",
    "أسواق": "market",
    "Market": "market",
    "market": "market",

    "إلكترونيات": "electronics",
    "Electronics": "electronics",
    "electronics": "electronics",

    "خدمات": "services",
    "Services": "services",
    "services": "services",

    "أزياء": "fashion",
    "Fashion": "fashion",
    "fashion": "fashion",

    "بنوك": "bank",
    "Banks": "bank",
    "Bank": "bank",
    "bank": "bank",

    "فنادق": "hotels_and_hospitality",
    "Hotels": "hotels_and_hospitality",

    "مقاولات": "construction_and_contractors",
    "Construction": "construction_and_contractors",

    "صحة": "health_and_medical_services",
    "طب": "health_and_medical_services",
    "Health": "health_and_medical_services",

    "منازل": "home",
    "Home": "home",
    "home": "home",

    "فعاليات": "events",
    "Events": "events",
    "events": "events",

    "ترفيه": "entertainment",
    "Entertainment": "entertainment",
    "entertainment": "entertainment"
  };

  return map[v] || v;
}

export function buildBusinessQuery(params: {
  page?: number;
  limit?: number;
  governorate?: string | null;
  category?: string | null;
}): string {
  const page = params.page || 1;
  const limit = params.limit || 20;

  const query = new URLSearchParams();
  query.set("page", String(page));
  query.set("limit", String(limit));

  const gov = normalizeGovernorateFilter(params.governorate);
  const cat = normalizeCategoryFilter(params.category);

  if (gov && gov !== "ALL") query.set("governorate", gov);
  if (cat && cat !== "ALL") query.set("category", cat);

  return query.toString();
}
