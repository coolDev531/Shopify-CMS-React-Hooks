## Shopify CMS

This runs a local FTP server (on localhost) that will communicate with Shopify over HTTP API and allows you to upload/download/edit your theme files and assets using your favorite FTP client.

Note: this tool is built with [Node.js](https://nodejs.org) and is installed via [npm](https://www.npmjs.org) so make sure to have Node installed. I have tested this on Mac and Windows. 

### Installation:

    npm install -g shopify-cms

Setting up env variables:
```dotenv
SHOPIFY_CMS_SHOP
SHOPIFY_CMS_STOREFRONT_DIGEST
SHOPIFY_CMS_ACCESS_TOKEN
SHOPIFY_CMS_THEME_ID
SHOPIFY_CMS_FOLDER
```


### Usage:

    `shopify-cms`

### Get Shopify API Key(s)

You will need a Shopify API key-pair.

* Go to: [{store-name}.myshopify.com/admin/apps](https://myshopify.com/admin/apps)
* Click "Private Apps" in the top right corner
* Click on an existing private app or create a new one
* Copy the API key and Password
* You will need access to read / write Themes
