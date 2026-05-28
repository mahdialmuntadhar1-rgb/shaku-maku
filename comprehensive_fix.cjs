// Comprehensive fix for all problematic string literals
const fs = require('fs');

const filePath = 'src/components/BusinessFeed.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all problematic multilingual descriptions with simple English versions
const replacements = [
  {
    old: `: \`\${category?.name[lang] || 'خوێندن'}ی سەرەتایی بە مامۆستای پسپۆڕ. ژینگەی خوێندنی باڵای.\`,
    new: `: \`Leading educational institution with expert instructors and quality learning environment.\`,`
  },
  {
    old: `: \`\${category?.name[lang] || 'تعليمي'} رائد مع مدربين خبراء. بيئة تعليمية عالية الجودة.\`,`,
    new: `: \`Leading educational institution with expert instructors and quality learning environment.\`,`
  },
  {
    old: `: \`\${category?.name[lang] || 'ئۆتۆمبێل'}ی پسپۆڕانە بە تەکنیکی پێسەندراو. چاککردنی باڵا و پاراستن.\`,`,
    new: `: \`Expert automotive services with certified technicians. Quality maintenance and repairs.\`,`
  },
  {
    old: `: \`\${category?.name[lang] || 'السيارات'} خدمات خبراء مع فنيين معتمدين. صيانة وإصلاح عالي الجودة.\`,`,
    new: `: \`Expert automotive services with certified technicians. Quality maintenance and repairs.\`,`
  }
];

replacements.forEach(({ old, new: newText }) => {
  content = content.replace(old, newText);
});

fs.writeFileSync(filePath, content);
console.log('Fixed all problematic string literals');
