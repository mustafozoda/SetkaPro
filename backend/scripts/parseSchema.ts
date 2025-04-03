import fs from "fs";
import path from "path";
import { getSchema } from "@mrleebo/prisma-ast";

const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
const schema = fs.readFileSync(schemaPath, "utf-8");

const ast = getSchema(schema);

const models = ast.list
  .filter((node: any) => node.type === "model")
  .map((model: any) => ({
    name: model.name,
    fields: model.properties
      .filter((p: any) => p.type === "field")
      .map((field: any) => ({
        name: field.name,
        type: field.fieldType,
        isRequired: !field.optional,
        isArray: !!field.array,
        isRelation:
          field.attributes?.some((a: any) => a.name === "relation") || false,
        default:
          field.attributes?.find((a: any) => a.name === "default")?.args?.[0]
            ?.value ?? null,
      })),
  }));

const jsonOutput = JSON.stringify(models, null, 2);

// ✅ Save to file
const outputPath = path.join(__dirname, "models.json");
fs.writeFileSync(outputPath, jsonOutput, "utf-8");

// ✅ Also print to console
console.log(jsonOutput);

// npx ts-node scripts/parseSchema.ts
