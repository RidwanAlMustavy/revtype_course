const fs = require('fs');
const path = require('path');

const targets = [
  path.join(__dirname, '..', 'public', '_next'),
  path.join(__dirname, '..', 'public', '404'),
];

for (const target of targets) {
  if (fs.existsSync(target)) {
    try {
      fs.rmSync(target, { recursive: true, force: true });
      console.log(`Cleaned: ${target}`);
    } catch (err) {
      console.error(`Failed to clean ${target}:`, err);
    }
  }
}
