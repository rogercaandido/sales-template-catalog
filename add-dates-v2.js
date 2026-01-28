const fs = require('fs');

// Read the file
let content = fs.readFileSync('index.html', 'utf-8');
const lines = content.split('\n');

// Find templates without createdAt and add it
const result = [];
let templateStart = -1;
let hasCreatedAt = false;
let messageEnd = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // Detect start of template object
  if (trimmed === '{' && i > 0 && lines[i-1].includes('consulfarma: [' || lines[i-1].includes('seminariosconsulfarma: [') || lines[i-1].includes('icosmetologia: [') || lines[i-1].includes('hinutrition: ['))) {
    templateStart = i;
    hasCreatedAt = false;
    messageEnd = -1;
  }

  // Inside a template
  if (templateStart >= 0) {
    // Check for createdAt
    if (trimmed.startsWith('createdAt:')) {
      hasCreatedAt = true;
    }

    // Check for end of message line
    if (trimmed.startsWith('message:')) {
      // Message might be multiline, find where it ends
      let j = i;
      while (j < lines.length && !lines[j].includes('",' ) && !lines[j].trim().endsWith('"')) {
        j++;
      }
      messageEnd = j;
    }

    // Check for closing brace
    if (trimmed === '},') {
      // If we haven't found createdAt, add it after message
      if (!hasCreatedAt && messageEnd >= 0) {
        result.push(line);
        // Find the indent level
        const indent = lines[messageEnd].match(/^(\s*)/)[1];
        result.splice(result.length - 1, 0, `${indent}  createdAt: "2025-12-22"`);
        templateStart = -1;
        hasCreatedAt = false;
        messageEnd = -1;
        continue;
      }
      templateStart = -1;
      hasCreatedAt = false;
      messageEnd = -1;
    }
  }

  result.push(line);
}

// Write back
const newContent = result.join('\n');
fs.writeFileSync('index.html', newContent, 'utf-8');

// Count results
const afterCount = (newContent.match(/createdAt:/g) || []).length;
console.log(`✓ Templates with createdAt: ${afterCount}/112`);
