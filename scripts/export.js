const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const publicDir = path.join(__dirname, '..', 'public');

if (fs.existsSync(outDir)) {
  try {
    fs.cpSync(outDir, publicDir, { recursive: true, force: true });
    console.log(`Successfully exported static build from out/ to public/`);
  } catch (err) {
    console.error(`Failed to copy from out/ to public/:`, err);
    process.exit(1);
  }
} else {
  console.error(`Error: out/ directory does not exist.`);
  process.exit(1);
}
