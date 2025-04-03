import fs from "fs";
import path from "path";

// Extensions to include
const allowedExtensions = [".ts", ".prisma", ".json", ".md", ".env.example"];

// Specific files to exclude (regardless of extension)
const excludedFiles = ["package-lock.json", "yarn.lock"];

// Folders to skip
const excludedDirs = ["node_modules", ".git", "dist", "build", "coverage"];

const outputFile = "code_dump.txt";
const outputStream = fs.createWriteStream(outputFile, { flags: "w" });

function shouldInclude(file: string): boolean {
  const extOk = allowedExtensions.some((ext) => file.endsWith(ext));
  const nameOk = !excludedFiles.includes(path.basename(file));
  return extOk && nameOk;
}

function shouldExcludeDir(dirName: string): boolean {
  return excludedDirs.includes(dirName);
}

function collectFiles(dir: string) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (!shouldExcludeDir(item.name)) {
        collectFiles(fullPath);
      }
    } else if (shouldInclude(item.name)) {
      try {
        const content = fs.readFileSync(fullPath, "utf-8");

        outputStream.write(`\n\n--- File: ${fullPath} ---\n`);
        outputStream.write(content);
      } catch (err) {
        console.error(`❌ Failed to read ${fullPath}:`, err);
      }
    }
  }
}

collectFiles(".");
outputStream.end(() => {
  console.log(`✅ Code dump saved to ${outputFile}`);
});
