import * as chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { Asset } from "shopify-typed-node-api/dist/clients/rest/dataTypes";

export const initBackup = async (api: RestClient, SHOPIFY_CMS_THEME_ID: string) => {
  const date = Date.now();
  try {
    console.log(chalk.green(`Backup initiated: ${date} - Loading...`));
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
        )
    );

    console.log(chalk.green(`Backup in progress: Assets downloaded`));

    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "backup", String(date)));
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "backup", String(date), "templates"));
    fs.mkdirSync(path.join(process.cwd(), ".shopify-cms", "backup", String(date), "config"));
    files.map((file) => {
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "backup", String(date), file.body.asset.key),
        file.body.asset.value
          ? Buffer.from(file.body.asset.value)
          : Buffer.from(file.body.asset.attachment, "base64")
      );
    });

    console.log(chalk.green(`Backup complete`));
  } catch (err) {
    console.log(err.message);
    fs.rmdirSync(path.join(process.cwd(), ".shopify-cms", "backup", String(date)));
  }
};
