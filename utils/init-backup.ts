import chalk from "chalk";
import fs from "fs";
import path from "path";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { Asset } from "shopify-typed-node-api/dist/clients/rest/dataTypes";

export const initBackup = async (
  api: RestClient,
  SHOPIFY_CMS_THEME_ID: string,
  folder = `backup/${Date.now()}`
) => {
  try {
    console.log(chalk.green(`Backup initiated: ${folder} - Loading...`));
    const { body } = await api.get<Asset.Get>({
      path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
      tries: 20,
    });

    console.log(chalk.yellowBright(`Backup in progress: Assets directory loaded`));

    const files = await Promise.all(
      body.assets
        .filter((file) => /^(templates|config).*?.json$/.test(file.key))
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
              console.log(chalk.yellowBright(`Backup in progress: ${file.key}`));
              return data;
            })
            .catch((e) => {
              console.log(chalk.cyan(e));
              return null;
            })
        )
    );

    console.log(chalk.green(`Backup in progress: Assets downloaded`));

    if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", folder))) {
      fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", folder));
    }
    if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", folder, "templates"))) {
      fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", folder, "templates"));
    }
    if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", folder, "config"))) {
      fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", folder, "config"));
    }
    files.map((file) => {
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", folder, file.body.asset.key),
        file.body.asset.value
          ? Buffer.from(file.body.asset.value)
          : Buffer.from(file.body.asset.attachment, "base64")
      );
    });

    console.log(chalk.green(`Backup complete`));
  } catch (err) {
    console.log(chalk.redBright(err.message));
  }
};
