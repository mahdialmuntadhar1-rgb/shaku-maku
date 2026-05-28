// Fix the specific problematic line 90
const fs = require('fs');

const filePath = 'src/components/BusinessFeed.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find and replace the exact problematic line
const problematicLine = `      : \`\${category?.name[lang] || 'تعليمي'} رائد مع مدربين خبراء. بيئة تعليمية عالية الجودة.\`,`;
const fixedLine = `      : \`Leading educational institution with expert instructors. Quality learning environment.\`,`;

content = content.replace(problematicLine, fixedLine);

fs.writeFileSync(filePath, content);
console.log('Fixed line 90 string literal issue');
