import fs from "fs";
import path from "path";
import { configureThemeFiles } from "./configure-theme-files";
import { getAllFiles } from "./get-all-files";
import { Config } from "./init-config";
import { PROJECT_ROOT } from "./project-root";

export const copyFiles = (config: Config) => {
  const files = getAllFiles("theme");
  const fileData = files.map((file) => ({
    key: file.replace("theme/", ""),
    content: fs.readFileSync(path.join(PROJECT_ROOT, file), { encoding: "utf-8" }),
  }));

  fileData.forEach(({ key, content }) => {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "theme", key),
      configureThemeFiles(content, config)
    );
  });
};
