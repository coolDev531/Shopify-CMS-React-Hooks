import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";

export type Config = {
  deployment_server: string;
  development_server: string;
  global_footer_sections: string[];
  global_header_sections: string[];
};

export const initConfig = async (force: boolean) => {
  console.log({ fsExists: fs.existsSync(path.join(process.cwd(), ".shopify-cms")) });
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms"))) {
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms"));
  }

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "config.json"))) {
    fs.writeFileSync(path.join(process.cwd(), ".shopify-cms", "config.json"), JSON.stringify({}));
  }

  const config: Config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), ".shopify-cms", "config.json"), {
      encoding: "utf-8",
    })
  );

  if (
    !("global_header_sections" in config) ||
    !("global_footer_sections" in config) ||
    !("deployment_server" in config) ||
    !("development_server" in config) ||
    force
  ) {
    if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "sections"))) {
      const sections = fs.readdirSync(
        path.join(process.cwd(), ".shopify-cms", "theme", "sections")
      );

      const newConfig: Config = await inquirer.prompt([
        {
          name: "development_server",
          type: "input",
          default: config?.development_server ?? "http://localhost:3000",
          message: "Please provide the dev server url",
        },
        {
          name: "deployment_server",
          type: "input",
          default: config?.deployment_server ?? "https://theme-development.vercel.app",
          message: "Please provide the deployment server url",
        },
        {
          name: "global_header_sections",
          type: "checkbox",
          message:
            "Do you want to set any HEADER global sections above the `{{ content_for_layout }}` ?",
          choices: sections.map((section) => ({
            name: section.replace(".liquid", ""),
            checked: config?.global_header_sections?.includes(section.replace(".liquid", "")),
          })),
        },
        {
          name: "global_footer_sections",
          type: "checkbox",
          message:
            "Do you want to set any FOOTER global sections below the `{{ content_for_layout }}` ?",
          choices: sections.map((section) => ({
            name: section.replace(".liquid", ""),
            checked: config?.global_footer_sections?.includes(section.replace(".liquid", "")),
          })),
        },
      ]);

      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "config.json"),
        JSON.stringify(newConfig, null, 2)
      );
      console.log(chalk.greenBright("Config updated"));

      return newConfig;
    }
  }

  return config;
};
