import fs from "fs";
import path from "path";

const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
const schema = fs.readFileSync(schemaPath, "utf-8");

// Match all models
const matches = Array.from(schema.matchAll(/model (\w+) \{/g));
const modelNames = matches.map((m) => m[1]);

// Output JSON format
const jsonOutput = {
  models: modelNames,
};

console.log(JSON.stringify(jsonOutput, null, 2));
// npx ts-node scripts/listModels.ts
