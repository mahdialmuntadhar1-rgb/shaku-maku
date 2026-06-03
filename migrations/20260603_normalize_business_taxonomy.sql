-- Normalize Shaku Maku business taxonomy.
-- Goal: database values match frontend dropdown ids exactly.

-- GOVERNORATES
UPDATE businesses SET governorate = 'baghdad'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('baghdad','bagdad','بغداد','محافظةبغداد');

UPDATE businesses SET governorate = 'erbil'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('erbil','arbil','hawler','hewler','اربيل','أربيل','هەولێر');

UPDATE businesses SET governorate = 'basra'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('basra','basrah','البصرة','بصرة','البصره','بصره');

UPDATE businesses SET governorate = 'sulaymaniyah'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('sulaymaniyah','sulaymania','sulaimani','suleimani','slemani','السليمانية','سليمانية','السليمانيه','سليمانيه','سلێمانی');

UPDATE businesses SET governorate = 'mosul'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('mosul','mousl','mousul','nineveh','ninewa','ninawa','nainawa','niniveh','neneveh','نينوى','نينوي','الموصل','موصل','محافظةنينوى','محافظهنينوى');

UPDATE businesses SET governorate = 'najaf'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('najaf','النجف','نجف','محافظةالنجف');

UPDATE businesses SET governorate = 'karbala'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('karbala','kerbala','كربلاء','کربلا','كربلا');

UPDATE businesses SET governorate = 'kirkuk'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('kirkuk','كركوك','کرکوک','کەرکووک');

UPDATE businesses SET governorate = 'anbar'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('anbar','الانبار','الأنبار','انبار','رمادي','ramadi');

UPDATE businesses SET governorate = 'duhok'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('duhok','dohuk','دهوك','دهۆك','دهوک');

UPDATE businesses SET governorate = 'babil'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('babil','babylon','hillah','hilla','بابل','الحلة','حلة');

UPDATE businesses SET governorate = 'diyala'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('diyala','ديالى','بعقوبة','baquba');

UPDATE businesses SET governorate = 'wasit'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('wasit','واسط','الكوت','kut');

UPDATE businesses SET governorate = 'saladin'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('saladin','salahaddin','salahaldin','salahaddin','salahaddin','salahadaldin','salahaddin','salahaldin','salahaldin','صلاحالدين','تكريت','tikrit');

UPDATE businesses SET governorate = 'maysan'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('maysan','ميسان','العمارة','amara');

UPDATE businesses SET governorate = 'dhiqar'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('dhiqar','dhiqar','ذيقار','ذىقار','الناصرية','nasiriyah','nasiriya');

UPDATE businesses SET governorate = 'muthanna'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('muthanna','المثنى','المثني','السماوة','samawah');

UPDATE businesses SET governorate = 'qadisiya'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('qadisiya','qadisiyah','qadisiyyah','القادسية','القادسيه','الديوانية','الديوانيه','diwaniya','diwaniyah');

UPDATE businesses SET governorate = 'halabja'
WHERE lower(replace(replace(replace(replace(trim(coalesce(governorate,'')), ' ', ''), '-', ''), '_', ''), '،', '')) IN
('halabja','حلبجة','حلبجه','هەڵەبجە');

-- CATEGORIES
UPDATE businesses SET category = 'restaurant'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('restaurant','restaurants','food','dining','eatery','kitchen','grill','fastfood','burger','pizza','shawarma','catering','مطعم','مطاعم','اكل','أكل');

UPDATE businesses SET category = 'cafe_bakery'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('cafebakery','cafe','cafes','café','coffee','coffeeshop','bakery','bakeries','pastry','dessert','sweets','cake','كافيه','مقهى','مخبز','كوفي');

UPDATE businesses SET category = 'supermarket'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('supermarket','supermarkets','grocery','groceries','hypermarket','minimarket','market','markets','سوبرماركت','بقالة');

UPDATE businesses SET category = 'mall'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('mall','malls','shopping','retail','shoppingcenter','مول','مولات','تسوق');

UPDATE businesses SET category = 'pharmacy'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('pharmacy','pharmacies','drugstore','medicine','medicines','صيدلية','صيدليات');

UPDATE businesses SET category = 'hospital'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('hospital','hospitals','مستشفى','مستشفيات');

UPDATE businesses SET category = 'clinic'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('clinic','clinics','medicalcenter','healthcenter','health','medical','lab','laboratory','عيادة','عيادات','مختبر');

UPDATE businesses SET category = 'doctor'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('doctor','doctors','physician','specialist','طبيب','اطباء','أطباء','دكتور');

UPDATE businesses SET category = 'dentist'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('dentist','dentists','dental','طبيbasnan','طبياسنان','اسنان');

UPDATE businesses SET category = 'salon'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('salon','salons','beauty','barber','hair','cosmetic','makeup','صالون','تجميل','حلاقة');

UPDATE businesses SET category = 'spa'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('spa','wellness','massage','سبا','مساج');

UPDATE businesses SET category = 'gym'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('gym','gyms','fitness','sport','sportsclub','club','نادي','نوادي','رياضة');

UPDATE businesses SET category = 'hotel'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('hotel','hotels','resort','resorts','hospitality','motel','فندق','فنادق');

UPDATE businesses SET category = 'travel_agency'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('travelagency','travel','tourism','tour','agency','airline','ticket','سفر','سياحة');

UPDATE businesses SET category = 'university'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('university','universities','college','school','education','training','institute','academy','جامعة','جامعات','مدرسة','معهد');

UPDATE businesses SET category = 'bank'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('bank','banks','finance','exchange','money','insurance','مصرف','بنك','بنوك');

UPDATE businesses SET category = 'real_estate'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('realestate','property','properties','housing','apartment','apartments','عقار','عقارات');

UPDATE businesses SET category = 'lawyer'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('lawyer','lawyers','legal','law','attorney','محامي','محامون','قانون');

UPDATE businesses SET category = 'car_dealer'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('cardealer','carsales','automotive','autosales','vehicle','cars','car','سيارات','سيارة','معارضسيارات');

UPDATE businesses SET category = 'car_rental'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('carrental','rentalcar','rentacar','تأجيرسيارات','تاجيرسيارات');

UPDATE businesses SET category = 'mobile_shop'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('mobileshop','mobile','mobiles','phone','phones','smartphone','electronics','techshop','computer','الكترونيات','إلكترونيات','موبايل');

UPDATE businesses SET category = 'furniture'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('furniture','homefurniture','decor','اثاث','أثاث','مفروشات');

UPDATE businesses SET category = 'clothing_store'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('clothingstore','clothing','fashion','clothes','boutique','apparel','ملابس','ازياء','أزياء');

UPDATE businesses SET category = 'software_company'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('softwarecompany','software','it','technology','digital','programming','webdesign','techsoftware','برمجيات','تقنية');

UPDATE businesses SET category = 'marketing_agency'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('marketingagency','marketing','advertising','mediaagency','اعلان','إعلان','تسويق');

UPDATE businesses SET category = 'construction_company'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('constructioncompany','construction','contractor','contractors','building','مقاولات','انشاءات','إنشاءات');

UPDATE businesses SET category = 'architecture'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('architecture','architect','design','هندسة','تصميم');

UPDATE businesses SET category = 'photography'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('photography','photo','studio','camera','تصوير','استوديو');

UPDATE businesses SET category = 'cinema'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('cinema','theatre','theater','movie','سينما','افلام','أفلام');

UPDATE businesses SET category = 'gaming_center'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('gamingcenter','gaming','game','games','playstation','العاب','ألعاب');

UPDATE businesses SET category = 'sports_club'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('sportsclub','sportsclubs','footballclub','stadium','ملعب','ملاعب','نادي');

UPDATE businesses SET category = 'pet_shop'
WHERE lower(replace(replace(replace(replace(trim(coalesce(category,'')), ' ', ''), '-', ''), '_', ''), '&', '')) IN
('petshop','pet','pets','veterinary','vet','حيوانات','بيطري');

UPDATE businesses SET category = 'other'
WHERE category IS NULL OR trim(category) = '';