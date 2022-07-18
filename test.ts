import * as fs from "fs";
const getAllFiles = (dir) =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = `${dir}/${file}`;
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);

const init2 = async () => {
  const files = getAllFiles("theme");
  console.log(files);
};
init2();
