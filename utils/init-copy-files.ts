import fs from "fs";
import path from "path";
import { configureThemeFiles } from "utils/configure-theme-files";
import { getAllFiles } from "utils/get-all-files";
import { Config } from "utils/init-config";
import { PROJECT_ROOT } from "utils/project-root";

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
