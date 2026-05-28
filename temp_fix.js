// Temporary fix for the string literal issue
const fs = require('fs');

const filePath = 'src/components/BusinessFeed.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the problematic line 90
const oldText = `      : \`\${category?.name[lang] || 'تعليمي'} رائد مع مدربين خبراء. بيئة تعليمية عالية الجودة.\`,`;
const newText = `      : \`\${category?.name[lang] || 'تعليمي'} رائد مع مدربين خبراء. بيئة تعليمية عالية الجودة.\`,`;

content = content.replace(oldText, newText);

fs.writeFileSync(filePath, content);
console.log('Fixed string literal issue');
