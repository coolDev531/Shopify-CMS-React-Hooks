import chalk from "chalk";
import fs from "fs";
import path from "path";
import Types, { DataType } from "shopify-typed-node-api";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { _Theme, Asset, Theme } from "shopify-typed-node-api/dist/clients/rest/dataTypes";
import { getAllFiles } from "./init-theme";
import { PROJECT_ROOT } from "./project-root";

export const createTheme = async (
  api: RestClient,
  theme_name: any,
  theme_publish: any
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
