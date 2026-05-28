// Drastic fix - remove the entire problematic section temporarily
const fs = require('fs');

const filePath = 'src/components/BusinessFeed.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the start and end of the problematic descriptions object
const startMarker = 'const descriptions = {';
const endMarker = '};';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex) + endMarker.length;

if (startIndex !== -1 && endIndex !== -1) {
  // Replace the entire descriptions object with a simple version
  const simpleDescriptions = `const descriptions = {
    restaurant: lang === 'en' ? 'Premium restaurant with excellent service and authentic cuisine.' : lang === 'ku' ? 'چێشتخانەی لوکس بە خزمەتگوزاری باش.' : 'مطعم ممتاز بخدمة ممتازة.',
    cafe: lang === 'en' ? 'Artisan cafe serving premium coffee and fresh pastries.' : lang === 'ku' ? 'کافێی ھونەری بە قاوەی لوکس.' : 'مقهى فني يقدم قهوة مميزة.',
    hotel: lang === 'en' ? 'Luxury hotel with premium amenities and exceptional hospitality.' : lang === 'ku' ? 'هوتەلی لوکس بە ئاسایشی بەرز.' : 'فندق فاخر بمرافق ممتازة.',
    shopping: lang === 'en' ? 'Modern shopping center with diverse retail options.' : lang === 'ku' ? 'ناوەندی کڕینی مۆدێرن.' : 'مركز تسوق حديث.',
    entertainment: lang === 'en' ? 'Exciting entertainment venue with live performances.' : lang === 'ku' ? 'شوێنی سەرگەرمی سەرەخۆش.' : 'مكان ترفيهي مثير.',
    services: lang === 'en' ? 'Professional services with expert staff and reliable solutions.' : lang === 'ku' ? 'خزمەتگوزاری پیشەیی بە ستافی پسپۆڕ.' : 'خدمات احترافية مع فريق خبراء.',
    health: lang === 'en' ? 'Modern health facility with advanced equipment.' : lang === 'ku' ? 'تەندروستیی مۆدێرن بە ئامێری پێشکەوتوو.' : 'منشأة صحية حديثة.',
    education: lang === 'en' ? 'Leading educational institution with expert instructors.' : lang === 'ku' ? 'ناوەندی خوێندنی سەرەتایی.' : 'مؤسسة تعليمية رائدة.',
    automotive: lang === 'en' ? 'Expert automotive services with certified technicians.' : lang === 'ku' ? 'خزمەتگوزاری ئۆتۆمبێلی پسپۆڕانە.' : 'خدمات السيارات الخبراء.',
    beauty: lang === 'en' ? 'Premium beauty services with skilled professionals.' : lang === 'ku' ? 'خزمەتگوزاری جوانی لوکس.' : 'خدمات تجميل مميزة.',
    it_software_services: lang === 'en' ? 'Advanced technology solutions and IT services.' : lang === 'ku' ? 'چارەسەری تەکنەلۆژیی پێشکەوتوو.' : 'حلول تقنية متقدمة.'
  };`;

  const beforeSection = content.substring(0, startIndex);
  const afterSection = content.substring(endIndex);
  
  content = beforeSection + simpleDescriptions + afterSection;
  
  fs.writeFileSync(filePath, content);
  console.log('Replaced entire descriptions object with simple version');
} else {
  console.log('Could not find descriptions object boundaries');
}
