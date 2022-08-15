import chalk from "chalk";
import fs from "fs";
import path from "path";
import { DataType } from "shopify-typed-node-api";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { Asset } from "shopify-typed-node-api/dist/clients/rest/dataTypes";
import { toCamelCase } from "./to-camel-case";
import { ShopifySection } from "../@types/shopify";
import { generateSectionsTypes, sectionToLiquid } from "./generate-sections";
import { toKebabCase } from "./to-kebab-case";

export const getSections = async (api: RestClient, SHOPIFY_CMS_THEME_ID: string) => {
  console.log(chalk.green(`Fetching sections - Loading...`));
  const { body } = await api.get<Asset.Get>({
    path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
    tries: 20,
  });

  console.log(chalk.yellowBright(`Type update in progress: Assets directory loaded`));

  const files = await Promise.all(
    body.assets
      .filter((file) => /^sections\/.*liquid$/.test(file.key))
      .map((file) =>
        api
          .get<Asset.GetById>({
            path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
            query: {
              "asset[key]": file.key,
            },
            tries: 20,
          })
          .then((data) => {
            console.log(chalk.yellowBright(`Reading file: ${file.key}`));
            return data;
          })
          .catch((e) => {
            console.log(chalk.cyan(e));
            return null;
          })
      )
  );

  const replacer = /(.|\n)*\{%-?\s?schema\s?-?%\}((.|\n)*)\{%-?\s?endschema\s?-?%\}(.|\n)*/i;
  const sections = {};

  files.map((file) => {
    sections[toCamelCase(file.body.asset.key.replace(/^sections\/(.*?)\.liquid$/i, "$1"))] =
      JSON.parse(file.body.asset.value.replace(replacer, "$2"));
  });

  generateSectionsTypes(sections);
  for (const key in sections) {
    const section = sections[key];
    const snippetName = `section_${toKebabCase(key)}.liquid`;
    const sectionName = `${toKebabCase(key)}.liquid`;
    const content = sectionToLiquid(section, key);

    if (
      !fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "snippets", snippetName))
    ) {
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "theme", "snippets", snippetName),
        `<div></div>`
      );
    }

    if (
      !fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "sections", sectionName))
    ) {
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "theme", "sections", sectionName),
        content
      );
    }

    const contentVerification = fs.readFileSync(
      path.join(process.cwd(), ".shopify-cms", "theme", "sections", sectionName),
      { encoding: "utf-8" }
    );
    if (contentVerification !== content) {
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "theme", "sections", sectionName),
        content
      );
    }
  }
};
