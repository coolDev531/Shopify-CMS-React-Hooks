import * as chalk from "chalk";
import * as fs from "fs";
import path from "path";

const dataLogger = () => {
  console.log("suepr data");

  console.log(chalk.green("asdasd"));
  console.log(fs.existsSync(path.join(process.cwd(), ".shopify-cms")));
};

dataLogger();

export const fetchPage = (string: string) => {
  console.log("string");
  return null;
};
