import chalk from "chalk";
import { Command } from "commander";
import path from "path";
import Shopify from "shopify-typed-node-api";
import { initTheme } from "./utils/init-theme";
import { initBackup } from "./utils/init-backup";
import { initDirectories } from "./utils/init-directories";
const watch = require("node-watch");

require("dotenv").config();

const program = new Command();

program
  .version(require("./package.json").version)
  .option("-b, --backup", "Create a backup of all shopify template & config files")
  .option("-c, --config", "Configure your theme")
  .parse(process.argv);

const {
  SHOPIFY_CMS_SHOP,
  SHOPIFY_CMS_STOREFRONT_DIGEST,
  SHOPIFY_CMS_ACCESS_TOKEN,
  SHOPIFY_CMS_FOLDER,
} = process.env;

let { SHOPIFY_CMS_THEME_ID } = process.env;

export const init = async () => {
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

  if (!SHOPIFY_CMS_FOLDER) return;

  watch(path.join(process.cwd(), SHOPIFY_CMS_FOLDER), { recursive: true }, async (evt, name) => {
    if (!name.match(/\.(ts|tsx)$/)) return;
    if (name.match(/^index\.ts.$/)) return;
    if (name.match(/^_/)) return;
    const startTime = Date.now();

    console.log(
      `[${chalk.gray(new Date().toLocaleTimeString())}]: ${chalk.cyan(`File modified: ${name}`)}`
    );

    const file = await import(name);

    console.log(file);
    console.log(`Models updated: ${Date.now() - startTime}ms`);
  });
};

init();

export const fetchPage = (string: string) => {
  console.log("string");
  return null;
};
