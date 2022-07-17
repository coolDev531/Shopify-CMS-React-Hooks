import * as chalk from "chalk";
import { Command } from "commander";
import Shopify from "shopify-typed-node-api";
import { initTheme } from "./utils/init-theme";
import { initBackup } from "./utils/init-backup";
import { initDirectories } from "./utils/init-directories";

require("dotenv").config();

const program = new Command();

program
  .version(require("./package.json").version)
  .option("-b, --backup", "Create a backup of all shopify template & config files")
  .option("-c, --config", "Configure your theme")
  .parse(process.argv);

const init = async () => {
  let { SHOPIFY_CMS_THEME_ID } = process.env;
  const {
    SHOPIFY_CMS_SHOP,
    SHOPIFY_CMS_STOREFRONT_DIGEST,
    SHOPIFY_CMS_ACCESS_TOKEN,
    SHOPIFY_CMS_FOLDER,
  } = process.env;

  initDirectories();

  if (!SHOPIFY_CMS_SHOP || !SHOPIFY_CMS_ACCESS_TOKEN) {
    console.log(
      chalk.red(
        "`SHOPIFY_CMS_SHOP` or `SHOPIFY_CMS_ACCESS_TOKEN` are not set. Please ensure that the variables are setup. Read more here: https://github.com/FelixTellmann/shopify-cms"
      )
    );
    return;
  }

  const api = new Shopify.Clients.Rest(SHOPIFY_CMS_SHOP, SHOPIFY_CMS_ACCESS_TOKEN);

  SHOPIFY_CMS_THEME_ID = await initTheme(api, SHOPIFY_CMS_THEME_ID);

  if (!SHOPIFY_CMS_THEME_ID) {
    return;
  }

  if (program.opts().backup) {
    initBackup(api, SHOPIFY_CMS_THEME_ID);
  }
};

init();

export const fetchPage = (string: string) => {
  console.log("string");
  return null;
};
