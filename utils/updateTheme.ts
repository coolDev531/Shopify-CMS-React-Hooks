import chalk from "chalk";
import fs from "fs";
import path from "path";
import { DataType } from "shopify-typed-node-api";
import { GraphqlClient } from "shopify-typed-node-api/dist/clients/graphql";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { Asset } from "shopify-typed-node-api/dist/clients/rest/dataTypes";
import { createMetafieldTypes } from "./create-metafield-types";
import { configureThemeFiles } from "./configure-theme-files";
import { getAllFiles } from "./get-all-files";
import { Config } from "./init-config";
import { PROJECT_ROOT } from "./project-root";

export const updateTheme = async (
  api: RestClient,
  SHOPIFY_CMS_THEME_ID: string,
  config: Config
) => {
  const files = await getAllFiles("theme");

  const fileData = files.map((file) => ({
    key: file.replace("theme/", ""),
    content: fs.readFileSync(path.join(PROJECT_ROOT, file), { encoding: "utf-8" }),
  }));

  await Promise.all(
    fileData.map(({ key, content }) => {
      return api
        .put<Asset.Update>({
          path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
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
};
