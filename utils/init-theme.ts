import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { Theme } from "shopify-typed-node-api/dist/clients/rest/dataTypes";
import { createTheme } from "./create-theme";
import { PROJECT_ROOT } from "./project-root";

export const getAllFiles = (dir) => {
  console.log(path.join(PROJECT_ROOT, dir));
  return fs.readdirSync(path.join(PROJECT_ROOT, dir)).reduce((files, file) => {
    const name = `${dir}/${file}`;
    const isDirectory = fs.statSync(path.join(PROJECT_ROOT, name)).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);
};

export const initTheme = async (
  api: RestClient,
  SHOPIFY_CMS_THEME_ID: string
): Promise<string | null> => {
  try {
    const themes = await api.get<Theme.Get>({
      path: "themes",
    });

    if (!themes) {
      return null;
    }

    if (
      !SHOPIFY_CMS_THEME_ID ||
      !themes.body.themes.some((theme) => {
        console.log(theme.id === +SHOPIFY_CMS_THEME_ID);
        console.log(theme);
        return theme.id === +SHOPIFY_CMS_THEME_ID;
      })
    ) {
      const { theme_create } = await inquirer.prompt([
        {
          name: "theme_create",
          type: "confirm",
          message:
            "No theme id was provided / or theme id is incorrect - Setup via `SHOPIFY_CMS_THEME_ID`, do you want to create a new Theme?",
        },
      ]);

      if (theme_create) {
        const { theme_name } = await inquirer.prompt([
          {
            name: "theme_name",
            type: "input",
            message: "Enter a name for your theme",
          },
        ]);

        const { theme_publish } = await inquirer.prompt([
          {
            name: "theme_publish",
            type: "confirm",
            message: "Do you want to publish the theme?",
          },
        ]);

        const theme = await createTheme(api, theme_name, theme_publish);

        return String(theme.id);
      }
      return null;
    }
  } catch (err) {
    if (err.response.code === 401) {
      console.log(
        chalk.red(
          "`SHOPIFY_CMS_SHOP` or `SHOPIFY_CMS_ACCESS_TOKEN` are incorrect. Please ensure that the variables are setup. Read more here: https://github.com/FelixTellmann/shopify-cms"
        )
      );
    }
    console.log(chalk.redBright(err.message));
    return null;
  }
  return SHOPIFY_CMS_THEME_ID;
};
