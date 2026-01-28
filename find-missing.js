const fs = require('fs');

// Read the file
const content = fs.readFileSync('index.html', 'utf-8');
const lines = content.split('\n');

// Find all template objects and check for createdAt
let inTemplates = false;
let currentTemplate = null;
let templateName = '';
let hasCreatedAt = false;
const missing = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // Check if we entered TEMPLATES section
  if (trimmed.includes('const TEMPLATES = {')) {
    inTemplates = true;
    continue;
  }

  // Check if we exited TEMPLATES section
  if (inTemplates && trimmed.includes('const COMPANIES')) {
    break;
  }

  if (!inTemplates) continue;

  // Check for template name
  if (trimmed.startsWith('name:')) {
    // Save previous template if it was missing createdAt
    if (templateName && !hasCreatedAt) {
      missing.push(`Line ${i-5}: ${templateName}`);
    }
    // Start new template
    templateName = trimmed.match(/name:\s*"([^"]+)"/)[1];
    hasCreatedAt = false;
  }

  // Check for createdAt
  if (trimmed.startsWith('createdAt:')) {
    hasCreatedAt = true;
  }

  // Check for end of template
  if (trimmed === '},') {
    if (templateName && !hasCreatedAt) {
      missing.push(`Line ${i}: ${templateName}`);
    }
    templateName = '';
    hasCreatedAt = false;
  }
}

console.log(`\nTemplates missing createdAt (${missing.length}):`);
missing.forEach(m => console.log(`  ${m}`));
