const fs = require('fs');

// Read the file
let content = fs.readFileSync('index.html', 'utf-8');

// Count templates before
const beforeCount = (content.match(/name:/g) || []).length;
console.log(`Total templates found: ${beforeCount}`);

// Add createdAt to templates that don't have it
// This regex finds: message: "..." followed by closing } without createdAt between them
const lines = content.split('\n');
const result = [];
let inTemplate = false;
let hasCreatedAt = false;
let messageLineIndex = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Check if this line contains "name:"
  if (line.trim().match(/^name:/)) {
    inTemplate = true;
    hasCreatedAt = false;
    messageLineIndex = -1;
  }

  // Check if this line contains "message:"
  if (inTemplate && line.trim().match(/^message:/)) {
    messageLineIndex = i;
  }

  // Check if this line contains "createdAt:"
  if (inTemplate && line.trim().match(/^createdAt:/)) {
    hasCreatedAt = true;
  }

  // Check if this is closing brace of template
  if (inTemplate && line.trim() === '},') {
    // If we found message but no createdAt, add it before the closing brace
    if (messageLineIndex >= 0 && !hasCreatedAt) {
      // Insert createdAt line before this closing brace
      result.push('          createdAt: "2025-12-22"');
    }
    inTemplate = false;
    hasCreatedAt = false;
    messageLineIndex = -1;
  }

  result.push(line);
}

// Join back
const newContent = result.join('\n');

// Count createdAt after
const afterCount = (newContent.match(/createdAt:/g) || []).length;
console.log(`Templates with createdAt: ${afterCount}`);

// Write back
fs.writeFileSync('index.html', newContent, 'utf-8');
console.log('✓ Added createdAt fields to all templates');
