// combineMarkdown.js

const fs = require('fs');
const path = require('path');

const inputDir = process.argv[2];
const outputFile = process.argv[3] || 'combined_output.md';

if (!inputDir) {
  console.error('❌ Please provide a folder path containing markdown files.\nUsage: node combineMarkdown.js <inputDir> [outputFile]');
  process.exit(1);
}

const files = fs.readdirSync(inputDir)
  .filter(file => file.endsWith('.md'))
  .sort(); // Optional: sort alphabetically

let output = '';

files.forEach((file, index) => {
  const filePath = path.join(inputDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  output += `\n\n<!-- FILE: ${file} -->\n\n` + content;
});

fs.writeFileSync(outputFile, output, 'utf-8');

console.log(`✅ Combined ${files.length} markdown files into "${outputFile}"`);
