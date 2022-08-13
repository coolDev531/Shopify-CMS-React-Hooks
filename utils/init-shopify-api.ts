import chalk from "chalk";
import Shopify from "shopify-typed-node-api";

export const initShopifyApi = () => {
  const { SHOPIFY_CMS_SHOP, SHOPIFY_CMS_ACCESS_TOKEN } = process.env;
  if (!SHOPIFY_CMS_SHOP || !SHOPIFY_CMS_ACCESS_TOKEN) {
    console.log(
      chalk.red(
        "`SHOPIFY_CMS_SHOP` or `SHOPIFY_CMS_ACCESS_TOKEN` are not set. Please ensure that the variables are setup. Read more here: https://github.com/FelixTellmann/shopify-cms"
      )
    );
    throw "Error";
  }

  const api = new Shopify.Clients.Rest(SHOPIFY_CMS_SHOP, SHOPIFY_CMS_ACCESS_TOKEN);
  const gql = new Shopify.Clients.Graphql(SHOPIFY_CMS_SHOP, SHOPIFY_CMS_ACCESS_TOKEN);

  return { api, gql };
};
