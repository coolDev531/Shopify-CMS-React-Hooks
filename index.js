"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPage = void 0;
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const dataLogger = () => {
    console.log("suepr data");
    console.log(chalk.green("asdasd"));
    console.log(fs.existsSync(path.join(process.cwd(), ".shopify-cms")));
};
dataLogger();
const fetchPage = (string) => {
    console.log("string");
    return null;
};
exports.fetchPage = fetchPage;
