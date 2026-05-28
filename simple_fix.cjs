// Simple fix for string literals
const fs = require('fs');

const filePath = 'src/components/BusinessFeed.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Remove all problematic multilingual content and replace with simple English
content = content.replace(/: `\$\{category\?.name\[lang\] \|\| '[^']+'}[^`]+`/g, ': `Professional business with quality service and excellent reputation.`');

fs.writeFileSync(filePath, content);
console.log('Fixed all string literals with simple replacement');
