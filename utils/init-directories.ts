import chalk from "chalk";
import fs from "fs";
import path from "path";

export function initDirectories() {
  console.log("asd");
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms"))) {
    console.log("asdcreating dir");
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms"));
  }

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "config.json"))) {
    fs.writeFileSync(path.join(process.cwd(), ".shopify-cms", "config.json"), JSON.stringify({}));
  }

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "types"));
  }

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"))) {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"),
      fs.readFileSync("./@types/shopify.ts", { encoding: "utf-8" })
    );
  }

  if (fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"))) {
    const masterFile = fs.readFileSync("./@types/shopify.ts", { encoding: "utf-8" });
    const currentFile = fs.readFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"),
      { encoding: "utf-8" }
    );
    if (masterFile !== currentFile) {
      console.log(chalk.green("updated shopify.ts"));
      fs.writeFileSync(path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"), masterFile);
    }
  }

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "backup"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "backup"));
  }

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "theme"));
  }

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "config"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "theme", "config"));
  }
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "layout"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "theme", "layout"));
  }
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "sections"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "theme", "sections"));
  }
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "snippets"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "theme", "snippets"));
  }
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "templates"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "theme", "templates"));
  }
}
