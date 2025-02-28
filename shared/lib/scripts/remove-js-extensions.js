const fs = require('fs');
const path = require('path');

const permissionlessDir = 'node_modules/permissionless';

function readDirectory(dirPath) {
  return fs.readdirSync(dirPath);
}

function isDirectory(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(dirPath) {
  const files = readDirectory(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);

    if (isDirectory(fullPath)) {
      processDirectory(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = readFile(fullPath);

      if (content !== null) {
        const updatedContent = content
          .replace(/from\s+['"]([^'"]+)\.js['"]/g, "from '$1'")
          .replace(/import\s+['"]([^'"]+)\.js['"]/g, "import '$1'");

        writeFile(fullPath, updatedContent);
      }
    }
  }
}

// Process the directory
processDirectory(permissionlessDir);
