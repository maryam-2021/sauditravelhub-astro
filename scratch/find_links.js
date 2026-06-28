import fs from 'fs';
import path from 'path';

const srcDir = './src';

function walkDir(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      files = files.concat(walkDir(filePath));
    } else {
      if (filePath.endsWith('.astro') || filePath.endsWith('.html')) {
        files.push(filePath);
      }
    }
  });
  return files;
}

const files = walkDir(srcDir);
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Look for href="/riyadh" or href="/riyadh/" or any variation that doesn't start with /destinations/
  // Match href="/riyadh or href="/riyadh/
  const regex = /href="\/riyadh(?!\/season)(?:\/|")/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(`Found direct link in ${file} at index ${match.index}: ${content.substring(match.index, match.index + 40)}`);
  }
});
