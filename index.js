"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPage = void 0;
const chalk = require("chalk");
const commander_1 = require("commander");
const shopify_typed_node_api_1 = require("shopify-typed-node-api");
const init_theme_1 = require("./utils/init-theme");
const init_backup_1 = require("./utils/init-backup");
const init_directories_1 = require("./utils/init-directories");
require("dotenv").config();
const program = new commander_1.Command();
program
    .version(require("./package.json").version)
    .option("-b, --backup", "Create a backup of all shopify template & config files")
    .option("-c, --config", "Configure your theme")
    .parse(process.argv);
const init = async () => {
    let { SHOPIFY_CMS_THEME_ID } = process.env;
    const { SHOPIFY_CMS_SHOP, SHOPIFY_CMS_STOREFRONT_DIGEST, SHOPIFY_CMS_ACCESS_TOKEN, SHOPIFY_CMS_FOLDER, } = process.env;
    (0, init_directories_1.initDirectories)();
    if (!SHOPIFY_CMS_SHOP || !SHOPIFY_CMS_ACCESS_TOKEN) {
        console.log(chalk.red("`SHOPIFY_CMS_SHOP` or `SHOPIFY_CMS_ACCESS_TOKEN` are not set. Please ensure that the variables are setup. Read more here: https://github.com/FelixTellmann/shopify-cms"));
        return;
    }
    const api = new shopify_typed_node_api_1.default.Clients.Rest(SHOPIFY_CMS_SHOP, SHOPIFY_CMS_ACCESS_TOKEN);
    SHOPIFY_CMS_THEME_ID = await (0, init_theme_1.initTheme)(api, SHOPIFY_CMS_THEME_ID);
    if (!SHOPIFY_CMS_THEME_ID) {
        return;
    }
    if (program.opts().backup) {
        (0, init_backup_1.initBackup)(api, SHOPIFY_CMS_THEME_ID);
    }
};
init();
const fetchPage = (string) => {
    console.log("string");
    return null;
};
exports.fetchPage = fetchPage;
