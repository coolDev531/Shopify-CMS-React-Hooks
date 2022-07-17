import * as chalk from "chalk";
import * as fs from "fs";
import * as inquirer from "inquirer";
import * as path from "path";
import { DataType } from "shopify-typed-node-api";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { Asset, Theme } from "shopify-typed-node-api/dist/clients/rest/dataTypes";

const getAllFiles = (dir) => {
  console.log(path.join(__dirname, "..", dir));
  return fs.readdirSync(path.join(__dirname, "..", dir)).reduce((files, file) => {
    const name = `${dir}/${file}`;
    const isDirectory = fs.statSync(path.join(__dirname, "..", name)).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);
};

export const initTheme = async (api: RestClient, SHOPIFY_CMS_THEME_ID: string) => {
  const themes = await api
    .get<Theme.Get>({
      path: "themes",
    })
    .catch((e) => {
      console.log(e);
      if (e.response.code === 401) {
        console.log(
          chalk.red(
            "`SHOPIFY_CMS_SHOP` or `SHOPIFY_CMS_ACCESS_TOKEN` are incorrect. Please ensure that the variables are setup. Read more here: https://github.com/FelixTellmann/shopify-cms"
          )
        );
      }
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
    const result = await inquirer.prompt([
      {
        name: "init_theme",
        type: "confirm",
        message:
          "No theme id was provided / or theme id is incorrect - Setup via `SHOPIFY_CMS_THEME_ID`, do you want to create a new Theme?",
      },
    ]);

    if (result.init_theme) {
      const result = await inquirer.prompt([
        {
          name: "theme_name",
          type: "input",
          message: "Enter a name for your theme",
        },
      ]);

      const theme = await api
        .post<Theme.Create>({
          data: {
            theme: {
              name: result.theme_name ?? `shopify-cms-${Date.now()}`,
            },
          },
          type: DataType.JSON,
          path: "themes",
        })
        .catch((e) => {
          console.log(e.message);
          return null;
        });

      const files = await getAllFiles("theme");

      const fileData = files.map((file) => ({
        key: file.replace("theme/", ""),
        content: fs.readFileSync(path.join(__dirname, "..", file), { encoding: "utf-8" }),
      }));

      await Promise.all(
        fileData.map(({ key, content }) => {
          console.log(key);
          return api
            .put<Asset.Update>({
              path: `themes/${theme.body.theme.id}/assets`,
              type: DataType.JSON,
              data: {
                asset: {
                  key: key,
                  value: content,
                },
              },
              tries: 20,
            })
            .then((data) => {
              console.log(chalk.yellowBright(`Upload in progress: ${key}`));
              return data;
            });
        })
      );

      await api
        .put<Theme.UpdateById>({
          data: {
            theme: {
              role: "main",
            },
          },
          type: DataType.JSON,
          path: `themes/${theme.body.theme.id}`,
        })
        .catch((e) => {
          console.log(e.message);
          return null;
        });

      return theme.body.theme.id;
    }
    return null;
  }

  return SHOPIFY_CMS_THEME_ID;
};
