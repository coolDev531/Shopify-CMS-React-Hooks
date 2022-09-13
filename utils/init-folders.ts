import chalk from "chalk";
import fs from "fs";
import path from "path";
import { PROJECT_ROOT } from "./project-root";

export const initFolders = () => {
  /*= =============== Root Folder ================ */
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms"));
  }

  /*= =============== Config ================ */
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "config.json"))) {
    fs.writeFileSync(path.join(process.cwd(), ".shopify-cms", "config.json"), JSON.stringify({}));
  }

  /*= =============== Types ================ */
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "types"));
  }

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"))) {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"),
      fs.readFileSync(path.join(PROJECT_ROOT, "./@types/shopify.ts"), { encoding: "utf-8" })
    );
  }

  if (fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"))) {
    const masterFile = fs.readFileSync(path.join(PROJECT_ROOT, "./@types/shopify.ts"), {
      encoding: "utf-8",
    });
    const currentFile = fs.readFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"),
      { encoding: "utf-8" }
    );
    if (masterFile !== currentFile) {
      console.log(chalk.green("updated shopify.ts"));
      fs.writeFileSync(path.join(process.cwd(), ".shopify-cms", "types", "shopify.ts"), masterFile);
    }
  }

  /*= =============== Backup ================ */
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "backup"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "backup"));
  }

  /*= =============== Theme ================ */
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

  /*= =============== React hooks ================ */
  const hooks = {
    root: path.join(process.cwd(), ".shopify-cms", "hooks"),
    shopifyCms: {
      target: path.join(".shopify-cms", "hooks", "shopify-cms.tsx"),
      src: path.join(PROJECT_ROOT, "./react-hooks/shopify-cms.tsx"),
    },
    shopifyNextCms: {
      target: path.join(".shopify-cms", "hooks", "shopify-next-cms.tsx"),
      src: path.join(PROJECT_ROOT, "./react-hooks/shopify-next-cms.tsx"),
    },
  };

  if (!fs.existsSync(hooks.root)) {
    fs.mkdirSync(hooks.root);
  }

  if (!fs.existsSync(hooks.shopifyCms.target)) {
    fs.writeFileSync(
      hooks.shopifyCms.target,
      fs.readFileSync(hooks.shopifyCms.src, { encoding: "utf-8" })
    );
  }

  if (fs.existsSync(hooks.shopifyCms.target)) {
    const masterFile = fs.readFileSync(hooks.shopifyCms.src, { encoding: "utf-8" });
    const currentFile = fs.readFileSync(hooks.shopifyCms.target, { encoding: "utf-8" });

    if (masterFile !== currentFile) {
      console.log(chalk.green("updated shopify-cms.tsx"));
      fs.writeFileSync(hooks.shopifyCms.target, masterFile);
    }
  }

  if (!fs.existsSync(hooks.shopifyNextCms.target)) {
    fs.writeFileSync(
      hooks.shopifyNextCms.target,
      fs.readFileSync(hooks.shopifyNextCms.src, { encoding: "utf-8" })
    );
  }

  if (fs.existsSync(hooks.shopifyNextCms.target)) {
    const masterFile = fs.readFileSync(hooks.shopifyNextCms.src, { encoding: "utf-8" });
    const currentFile = fs.readFileSync(hooks.shopifyNextCms.target, { encoding: "utf-8" });

    if (masterFile !== currentFile) {
      console.log(chalk.green("updated shopify-cms.tsx"));
      fs.writeFileSync(hooks.shopifyNextCms.target, masterFile);
    }
  }
};
