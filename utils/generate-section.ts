import chalk from "chalk";
import fs from "fs";
import path from "path";
import { DataType } from "shopify-typed-node-api";
import { RestClient } from "shopify-typed-node-api/dist/clients/rest";
import { Asset } from "shopify-typed-node-api/dist/clients/rest/dataTypes";
import { capitalize } from "./capitalize";
import { toKebabCase } from "./to-kebab-case";
import { ShopifySection, ShopifySettings, ShopifySettingsInput } from "../@types/shopify";

const sectionToLiquid = (section, key) => {
  const shopifyThemeString = fs.readFileSync(
    path.join(process.cwd(), ".shopify-cms", "theme", "layout", "theme.liquid"),
    {
      encoding: "utf-8",
    }
  );

  let sectionType = "_section-content";
  const regexp = new RegExp(`\\{%\\s+section\\s+["']${toKebabCase(key)}["']`, "gi");

  if (regexp.test(shopifyThemeString)) {
    sectionType = "_section-global-content";
  }

  return `{% include "${sectionType}", type: "${toKebabCase(key)}" %}
{% include "section_${toKebabCase(key)}" %}
  
{% schema %}
${JSON.stringify(section, undefined, 2)}
{% endschema %} 
`;
};

function getSettingsType(setting: ShopifySettingsInput) {
  switch (setting.type) {
    case "article":
      return "?: _Article_liquid";
    case "checkbox":
      return ": boolean";
    case "number":
      return "?: number";
    case "radio":
      return `: ${setting.options.map(({ value }) => `"${value}"`).join(" | ")}`;
    case "range":
      return ": number";
    case "select":
      return `: ${setting.options.map(({ value }) => `"${value}"`).join(" | ")}`;
    case "text":
      return "?: string";
    case "textarea":
      return "?: string";
    case "blog":
      return "?: _Blog_liquid";
    case "collection":
      return "?: _Collection_liquid";
    case "collection_list":
      return "?: _Collection_liquid[]";
    case "color":
      return "?: _Color_liquid";
    case "color_background":
      return "?: string";
    case "font_picker":
      return ": _Font_liquid";
    case "html":
      return "?: string";
    case "image_picker":
      return "?: _Image_liquid";
    case "link_list":
      return "?: _Linklist_liquid";
    case "liquid":
      return "?: string";
    case "page":
      return "?: _Page_liquid";
    case "product":
      return "?: _Product_liquid";
    case "product_list":
      return "?: _Product_liquid[]";
    case "richtext":
      return "?: `<p${string}</p>`";
    case "url":
      return "?: string";
    case "video_url":
      return `?: ("youtube" | "vimeo")[]`;
    case "font":
      return "?: string";
  }
}

const getImports = (sections: { [T: string]: ShopifySection }) => {
  const localTypes = [];

  const analyseSetting = (setting) => {
    if (setting.type === "article") {
      if (localTypes.includes("_Article_liquid")) return;
      localTypes.push("_Article_liquid");
    }
    if (setting.type === "blog") {
      if (localTypes.includes("_Blog_liquid")) return;
      localTypes.push("_Blog_liquid");
    }
    if (setting.type === "collection") {
      if (localTypes.includes("_Collection_liquid")) return;
      localTypes.push("_Collection_liquid");
    }
    if (setting.type === "collection_list") {
      if (localTypes.includes("_Collection_liquid")) return;
      localTypes.push("_Collection_liquid");
    }
    if (setting.type === "color") {
      if (localTypes.includes("_Color_liquid")) return;
      localTypes.push("_Color_liquid");
    }
    if (setting.type === "image_picker") {
      if (localTypes.includes("_Image_liquid")) return;
      localTypes.push("_Image_liquid");
    }
    if (setting.type === "font_picker") {
      if (localTypes.includes("_Font_liquid")) return;
      localTypes.push("_Font_liquid");
    }
    if (setting.type === "link_list") {
      if (localTypes.includes("_Linklist_liquid")) return;
      localTypes.push("_Linklist_liquid");
    }
    if (setting.type === "page") {
      if (localTypes.includes("_Page_liquid")) return;
      localTypes.push("_Page_liquid");
    }
    if (setting.type === "product") {
      if (localTypes.includes("_Product_liquid")) return;
      localTypes.push("_Product_liquid");
    }
    if (setting.type === "product_list") {
      if (localTypes.includes("_Product_liquid")) return;
      localTypes.push("_Product_liquid");
    }
  };

  for (const key in sections) {
    const section = sections[key];

    section.settings?.forEach(analyseSetting, localTypes);
    section.blocks?.forEach((block) => {
      block.settings?.forEach(analyseSetting, localTypes);
    });
  }

  if (localTypes.length) {
    return `import { ${localTypes.join(", ")} } from "./shopify";\n\n`;
  }
  return ``;
};

const sectionToTypes = (section, key) => {
  const filename = toKebabCase(section.name);
  const arr = [];
  const settings: ShopifySettingsInput[] = section.settings
    ?.filter((s) => s.type !== "header" && s.type !== "paragraph")
    .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

  arr.push(`export type ${capitalize(key)}Section = {`);
  if (section.blocks?.length) {
    arr.push(`  blocks: ${capitalize(key)}Blocks[];`);
  }
  arr.push(`  id: string;`);
  if (settings?.length) {
    arr.push(`  settings: {`);
    arr.push(
      settings
        .map(
          (setting) =>
            `    /** Input type: ${setting.type} */\n    ` +
            `${/[^\w_]/gi.test(setting.id) ? `"${setting.id}"` : `${setting.id}`}${getSettingsType(
              setting
            )};`
        )
        .sort((a, b) => {
          const aX = a.split("\n")[1];
          const bX = b.split("\n")[1];
          if (aX.includes("?") && !bX.includes("?")) {
            return 1;
          } else if (!aX.includes("?") && bX.includes("?")) {
            return -1;
          } else if (aX > bX) {
            return 1;
          } else if (aX < bX) {
            return -1;
          } else {
            return 0;
          }
        })
        .join("\n")
    );
    arr.push(`  };`);
  }
  arr.push(`  type: "${filename}";`);
  arr.push(`};`);

  if (section.blocks?.length && section.blocks.length === 1) {
    arr.push("");
    arr.push(`export type ${capitalize(key)}Blocks = {`);

    section.blocks?.forEach((block) => {
      const blockSettings: ShopifySettingsInput[] = block.settings
        ?.filter((s) => s.type !== "header" && s.type !== "paragraph")
        .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

      arr.push("  id: string;");

      if (blockSettings?.length) {
        arr.push(`  settings: {`);
        arr.push(
          blockSettings
            .map(
              (setting) =>
                `    /** Input type: ${setting.type} */\n    ` +
                `${
                  /[^\w_]/gi.test(setting.id) ? `"${setting.id}"` : `${setting.id}`
                }${getSettingsType(setting)};`
            )
            .sort((a, b) => {
              const aX = a.split("\n")[1];
              const bX = b.split("\n")[1];
              if (aX.includes("?") && !bX.includes("?")) {
                return 1;
              } else if (!aX.includes("?") && bX.includes("?")) {
                return -1;
              } else if (aX > bX) {
                return 1;
              } else if (aX < bX) {
                return -1;
              } else {
                return 0;
              }
            })
            .join("\n")
        );
        arr.push(`  };`);
      }

      arr.push(`  type: "${block.type}";`);
      arr.push(`};`);
    });
  }

  if (section.blocks?.length && section.blocks.length > 1) {
    arr.push("");
    arr.push(`export type ${capitalize(key)}Blocks =`);

    section.blocks?.forEach((block, i) => {
      const blockSettings: ShopifySettingsInput[] = block.settings
        ?.filter((s) => s.type !== "header" && s.type !== "paragraph")
        .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

      arr.push("  | {");
      arr.push("      id: string;");

      if (blockSettings?.length) {
        arr.push(`      settings: {`);
        arr.push(
          blockSettings
            .map(
              (setting) =>
                `        /** Input type: ${setting.type} */\n        ` +
                `${
                  /[^\w_]/gi.test(setting.id) ? `"${setting.id}"` : `${setting.id}`
                }${getSettingsType(setting)};`
            )
            .sort((a, b) => {
              const aX = a.split("\n")[1];
              const bX = b.split("\n")[1];
              if (aX.includes("?") && !bX.includes("?")) {
                return 1;
              } else if (!aX.includes("?") && bX.includes("?")) {
                return -1;
              } else if (aX > bX) {
                return 1;
              } else if (aX < bX) {
                return -1;
              } else {
                return 0;
              }
            })
            .join("\n")
        );
        arr.push(`      };`);
      }

      arr.push(`      type: "${block.type}";`);
      if (section.blocks.length - 1 === i) {
        arr.push(`    };`);
      } else {
        arr.push(`    }`);
      }
    });
  }
  arr.push("");
  return arr.join("\n");
};

export const generateSectionsTypes = (sections: { [T: string]: ShopifySection }) => {
  const imports = getImports(sections);
  let sectionUnionType = "export type Sections =";
  let typeContent = "";
  for (const key in sections) {
    const section = sections[key] as ShopifySection;

    typeContent += `${sectionToTypes(section, key)}\n`;
    sectionUnionType += `\n  | ${capitalize(key)}Section`;
  }

  if (!typeContent) return;

  const finalContent = `${imports + typeContent + sectionUnionType};\n`;
  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types", "sections.ts"))) {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "sections.ts"),
      finalContent
    );
    return;
  }

  const indexContentVerification = fs.readFileSync(
    path.join(process.cwd(), ".shopify-cms", "types", "sections.ts"),
    {
      encoding: "utf-8",
    }
  );

  if (indexContentVerification !== finalContent) {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "sections.ts"),
      finalContent
    );
  }
};

export const generateSections = async (
  api: RestClient,
  SHOPIFY_CMS_THEME_ID: string,
  sections: { [p: string]: ShopifySection }
) => {
  generateSectionsTypes(sections);
  for (const key in sections) {
    const section = sections[key];
    const snippetName = `section_${toKebabCase(key)}.liquid`;
    const sectionName = `${toKebabCase(key)}.liquid`;
    const content = sectionToLiquid(section, key);

    if (
      !fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "snippets", snippetName))
    ) {
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "theme", "snippets", snippetName),
        `<div></div>`
      );
      await api
        .put<Asset.Update>({
          path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
          type: DataType.JSON,
          data: {
            asset: {
              key: `snippets/${snippetName}`,
              value: `<div></div>`,
            },
          },
          tries: 20,
        })
        .then((data) => {
          console.log(chalk.yellowBright(`Upload in progress: ${key}`));
          return data;
        })
        .catch((err) => {
          console.log(chalk.redBright(err.message));
        });
    }

    if (
      !fs.existsSync(path.join(process.cwd(), ".shopify-cms", "theme", "sections", sectionName))
    ) {
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "theme", "sections", sectionName),
        content
      );
      await api
        .put<Asset.Update>({
          path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
          type: DataType.JSON,
          data: {
            asset: {
              key: `sections/${sectionName}`,
              value: content,
            },
          },
          tries: 20,
        })
        .then((data) => {
          console.log(chalk.yellowBright(`Upload in progress: ${key}`));
          return data;
        })
        .catch((err) => {
          console.log(chalk.redBright(err.message));
        });
    }

    const contentVerification = fs.readFileSync(
      path.join(process.cwd(), ".shopify-cms", "theme", "sections", sectionName),
      { encoding: "utf-8" }
    );
    if (contentVerification !== content) {
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "theme", "sections", sectionName),
        content
      );
      await api
        .put<Asset.Update>({
          path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
          type: DataType.JSON,
          data: {
            asset: {
              key: `sections/${sectionName}`,
              value: content,
            },
          },
          tries: 20,
        })
        .then((data) => {
          console.log(chalk.yellowBright(`Upload in progress: ${key}`));
          return data;
        })
        .catch((err) => {
          console.log(chalk.redBright(err.message));
        });
    }
  }
};

export const generateSettings = async (
  api: RestClient,
  SHOPIFY_CMS_THEME_ID: string,
  settingsSchema: ShopifySettings
) => {
  const settings = settingsSchema.reduce((acc: ShopifySettingsInput[], group) => {
    if (!("settings" in group)) return acc;

    return [
      ...acc,
      ...((group.settings as any)
        .filter((s) => s.type !== "header" && s.type !== "paragraph")
        .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)) as ShopifySettingsInput[]),
    ];
  }, []);

  const localTypes = [];
  const analyseSetting = (setting) => {
    if (setting.type === "article") {
      if (localTypes.includes("_Article_liquid")) return;
      localTypes.push("_Article_liquid");
    }
    if (setting.type === "blog") {
      if (localTypes.includes("_Blog_liquid")) return;
      localTypes.push("_Blog_liquid");
    }
    if (setting.type === "collection") {
      if (localTypes.includes("_Collection_liquid")) return;
      localTypes.push("_Collection_liquid");
    }
    if (setting.type === "collection_list") {
      if (localTypes.includes("_Collection_liquid")) return;
      localTypes.push("_Collection_liquid");
    }
    if (setting.type === "color") {
      if (localTypes.includes("_Color_liquid")) return;
      localTypes.push("_Color_liquid");
    }
    if (setting.type === "image_picker") {
      if (localTypes.includes("_Image_liquid")) return;
      localTypes.push("_Image_liquid");
    }
    if (setting.type === "font_picker") {
      if (localTypes.includes("_Font_liquid")) return;
      localTypes.push("_Font_liquid");
    }
    if (setting.type === "link_list") {
      if (localTypes.includes("_Linklist_liquid")) return;
      localTypes.push("_Linklist_liquid");
    }
    if (setting.type === "page") {
      if (localTypes.includes("_Page_liquid")) return;
      localTypes.push("_Page_liquid");
    }
    if (setting.type === "product") {
      if (localTypes.includes("_Product_liquid")) return;
      localTypes.push("_Product_liquid");
    }
    if (setting.type === "product_list") {
      if (localTypes.includes("_Product_liquid")) return;
      localTypes.push("_Product_liquid");
    }
  };

  settings.forEach(analyseSetting);
  const arr = [];
  if (settings.length) {
    arr.push(`export type SettingsSchema = {`);

    arr.push(
      settings
        .map(
          (setting) =>
            `  /** Input type: ${setting.type} */\n  ` +
            `${/[^\w_]/gi.test(setting.id) ? `"${setting.id}"` : `${setting.id}`}${getSettingsType(
              setting
            )};`
        )
        .sort((a, b) => {
          const aX = a.split("\n")[1];
          const bX = b.split("\n")[1];
          if (aX.includes("?") && !bX.includes("?")) {
            return 1;
          } else if (!aX.includes("?") && bX.includes("?")) {
            return -1;
          } else if (aX > bX) {
            return 1;
          } else if (aX < bX) {
            return -1;
          } else {
            return 0;
          }
        })
        .join("\n")
    );
    arr.push(`};`);
  }

  const typesContent = `import { ${localTypes.join(", ")} } from "./shopify";\n\n${arr.join(
    "\n"
  )}\n`;

  if (!fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types", "settings.ts"))) {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "settings.ts"),
      typesContent
    );
    return;
  }

  const indexContentVerification = fs.readFileSync(
    path.join(process.cwd(), ".shopify-cms", "types", "settings.ts"),
    {
      encoding: "utf-8",
    }
  );

  if (indexContentVerification !== typesContent) {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "settings.ts"),
      typesContent
    );
  }

  const schemaContent = JSON.stringify(settingsSchema, undefined, 2);
  if (
    !fs.existsSync(
      path.join(process.cwd(), ".shopify-cms", "theme", "config", "settings_schema.json")
    )
  ) {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "theme", "config", "settings_schema.json"),
      schemaContent
    );
    await api
      .put<Asset.Update>({
        path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
        type: DataType.JSON,
        data: {
          asset: {
            key: `config/settings_schema.json`,
            value: schemaContent,
          },
        },
        tries: 20,
      })
      .then((data) => {
        console.log(chalk.yellowBright(`Upload in progress: settings_schema.json`));
        return data;
      })
      .catch((err) => {
        console.log(chalk.redBright(err.message));
      });
  }

  const contentVerification = fs.readFileSync(
    path.join(process.cwd(), ".shopify-cms", "theme", "config", "settings_schema.json"),
    {
      encoding: "utf-8",
    }
  );

  if (contentVerification !== schemaContent) {
    fs.writeFileSync(
      path.join(process.cwd(), ".shopify-cms", "theme", "config", "settings_schema.json"),
      schemaContent
    );
    await api
      .put<Asset.Update>({
        path: `themes/${SHOPIFY_CMS_THEME_ID}/assets`,
        type: DataType.JSON,
        data: {
          asset: {
            key: `config/settings_schema.json`,
            value: schemaContent,
          },
        },
        tries: 20,
      })
      .then((data) => {
        console.log(chalk.yellowBright(`Upload in progress: settings_schema.json`));
        return data;
      })
      .catch((err) => {
        console.log(chalk.redBright(err.message));
      });
  }
};
