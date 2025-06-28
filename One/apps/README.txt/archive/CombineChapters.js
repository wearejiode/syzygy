#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const inputDir = process.argv[2];
const outputFile = process.argv[3] || 'combined_output.md';

if (!inputDir) {
  console.error('❌ Please provide a folder path containing markdown files.\nUsage: node combineMarkdown.js <inputDir> [outputFile]');
  process.exit(1);
}

try {
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ The directory "${inputDir}" does not exist.`);
    process.exit(1);
  }

  const files = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.md'))
    .sort();

  if (files.length === 0) {
    console.warn(`⚠️ No markdown (.md) files found in ${inputDir}`);
    process.exit(0);
  }

  let output = '';

  files.forEach(file => {
    const filePath = path.join(inputDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`📄 Including: ${file}`);
    output += `\n\n<!-- FILE: ${file} -->\n\n` + content;
  });

  fs.writeFileSync(outputFile, output, 'utf-8');
  console.log(`✅ Combined ${files.length} markdown files into "${outputFile}"`);

} catch (error) {
  console.error('❌ An error occurred:', error);
  process.exit(1);
}