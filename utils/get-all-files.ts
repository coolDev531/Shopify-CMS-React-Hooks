import fs from "fs";
import path from "path";
import { PROJECT_ROOT } from "./project-root";

export const getAllFiles = (dir) => {
  return fs.readdirSync(path.join(PROJECT_ROOT, dir)).reduce((files, file) => {
    const name = `${dir}/${file}`;
    const isDirectory = fs.statSync(path.join(PROJECT_ROOT, name)).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);
};
