// Fix the problematic Arabic string by simplifying it
const fs = require('fs');

const filePath = 'src/components/BusinessFeed.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the problematic line with a simpler version
const problematicLine = `      : \`\${category?.name[lang] || 'تعليمي'} رائد مع مدربين خبراء. بيئة تعليمية عالية الجودة.\`,`;
const simpleLine = `      : \`Leading educational institution with expert instructors and quality learning environment.\`,`;

content = content.replace(problematicLine, simpleLine);

fs.writeFileSync(filePath, content);
console.log('Fixed Arabic string literal issue');
