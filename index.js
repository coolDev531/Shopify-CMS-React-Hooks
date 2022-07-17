"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPage = void 0;
const chalk = require("chalk");
const fs = require("fs");
const path_1 = require("path");
const dataLogger = () => {
    console.log("suepr data");
    console.log(chalk.green("asdasd"));
    console.log(fs.existsSync(path_1.default.join(process.cwd(), ".shopify-cms")));
};
dataLogger();
const fetchPage = (string) => {
    console.log("string");
    return null;
};
exports.fetchPage = fetchPage;
