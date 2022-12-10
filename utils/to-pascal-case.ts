const toCamelCase = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/[\s-]+/gi, "");

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const toPascalCase = (str) => capitalize(toCamelCase(str));
