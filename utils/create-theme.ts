import chalk from "chalk";
import fs from "fs";
import path from "path";
import { DataType } from "shopify-typed-node-api";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { _Theme, Asset, Theme } from "shopify-typed-node-api/dist/clients/rest/dataTypes";
import { configureThemeFiles } from "./configure-theme-files";
import { getAllFiles } from "./get-all-files";
import { Config } from "./init-config";
import { PROJECT_ROOT } from "./project-root";

export const createTheme = async (
  api: RestClient,
  theme_name: any,
  theme_publish: any,
  config: Config
): Promise<_Theme> => {
  try {
    const theme = await api.post<Theme.Create>({
      data: {
        theme: {
          name: theme_name ?? `shopify-cms-${Date.now()}`,
        },
      },
      type: DataType.JSON,
      path: "themes",
    });

    const files = await getAllFiles("theme");

    const fileData = files.map((file) => ({
      key: file.replace("theme/", ""),
      content: fs.readFileSync(path.join(PROJECT_ROOT, file), { encoding: "utf-8" }),
    }));

    await Promise.all(
      fileData.map(({ key, content }) => {
        return api
          .put<Asset.Update>({
            path: `themes/${theme.body.theme.id}/assets`,
            type: DataType.JSON,
            data: {
              asset: {
                key: key,
                value: configureThemeFiles(content, config),
              },
            },
            tries: 20,
          })
          .then((data) => {
            console.log(chalk.greenBright(`File uploaded to Shopify: ${key}`));
            return data;
          });
      })
    );

    if (theme_publish) {
      await api.put<Theme.UpdateById>({
        data: {
          theme: {
            role: "main",
          },
        },
        type: DataType.JSON,
        path: `themes/${theme.body.theme.id}`,
      });
    }

    return theme.body.theme;
  } catch (err) {
    console.log(chalk.redBright(err.message));
    return null;
  }
};
