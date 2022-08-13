import chalk from "chalk";
import fs from "fs";
import path from "path";
import { GraphqlClient } from "shopify-typed-node-api/dist/clients/graphql";
import { PROJECT_ROOT } from "utils/project-root";
import { MetafieldDefinitionsQuery, MetafieldDefinitionsQueryVariables } from "utils/shopify-gql-types";

const ownerTypes = [
  "ARTICLE",
  "BLOG",
  "COLLECTION",
  "PAGE",
  "PRODUCT",
  "PRODUCTVARIANT",
  "SHOP",
] as const;

const getType = (type) => {
  switch (type) {
    case "product_reference": {
      return `Omit<_Product_liquid, "metafields">`;
    }
    case "list.product_reference": {
      return `Omit<_Product_liquid, "metafields">[]`;
    }
    case "variant_reference": {
      return "_Variant_liquid_json";
    }
    case "list.variant_reference": {
      return "_Variant_liquid_json[]";
    }
    case "page_reference": {
      return "_Page_liquid_json";
    }

    case "file_reference": {
      return "_Metafield_liquid_file_reference_generic | _Metafield_liquid_file_reference_image";
    }
    case "list.file_reference": {
      return "(_Metafield_liquid_file_reference_generic | _Metafield_liquid_file_reference_image)[]";
    }
    case "color":
    case "date":
    case "date_time":
    case "single_line_text_field":
    case "multi_line_text_field":
    case "url": {
      return "string";
    }
    case "list.color":
    case "list.date":
    case "list.date_time":
    case "list.single_line_text_field":
    case "list.multi_line_text_field":
    case "list.page_reference": {
      return "string[]";
    }
    case "number_integer": {
      return "number";
    }
    case "list.number_integer": {
      return "number[]";
    }
    case "number_decimal": {
      return "number | string";
    }
    case "list.number_decimal": {
      return "(number | string)[]";
    }
    case "json": {
      return "unknown";
    }
    case "volume":
    case "weight":
    case "dimension": {
      return "{ type: string; unit: string; value: number }";
    }
    case "rating": {
      return "{ rating: string; scale_max: string; scale_min: string }";
    }
  }
};

const getKeyType = (key: typeof ownerTypes[number]) => {
  switch (key) {
    case "ARTICLE":
      return "_Article_metafields";
    case "BLOG":
      return "_Blog_metafields";
    case "COLLECTION":
      return "_Collection_metafields";
    case "PAGE":
      return "_Page_metafields";
    case "PRODUCT":
      return "_Product_metafields";
    case "PRODUCTVARIANT":
      return "_Variant_metafields";
    case "SHOP":
      return "_Shop_metafields";
  }
};
const imports = `import { _Metafield_liquid, _Metafield_liquid_file_reference, _Metafield_liquid_list_file_reference, _Metafield_liquid_list_product_reference, _Metafield_liquid_list_variant_reference, _Metafield_liquid_page_reference, _Metafield_liquid_product_reference, _Metafield_liquid_variant_reference } from "types/shopify";\n`;

export const metafieldDefinitionsQuery = /* GraphQL */ `
  query metafieldDefinitions($ownerType: MetafieldOwnerType!) {
    metafieldDefinitions(first: 250, ownerType: $ownerType) {
      edges {
        node {
          key
          type {
            name
          }
        }
      }
    }
  }
`;

export async function createMetafieldTypes(gql: GraphqlClient) {
  const returnData: { data: { key: string; type: string }[]; owner: typeof ownerTypes[number] }[] =
    [];

  for (let i = 0; i < ownerTypes.length; i++) {
    const owner = ownerTypes[i];
    const data = await gql.query<{
      response: { data: MetafieldDefinitionsQuery };
      variables: MetafieldDefinitionsQueryVariables;
    }>({
      tries: 20,
      data: {
        query: metafieldDefinitionsQuery,
        variables: {
          ownerType: owner,
        },
      },
    });

    returnData.push({
      owner,
      data: data?.body?.data?.metafieldDefinitions?.edges?.map(({ node }) => ({
        ...node,
        type: node.type.name,
      })),
    });
  }

  const metafieldTypesContent = [imports];

  returnData.forEach(({ owner, data }) => {
    if (data.length === 0) {
      metafieldTypesContent.push(
        `export type ${getKeyType(owner)} = { [T: string]: _Metafield_liquid };\n`
      );
    }
    if (data.length > 0) {
      metafieldTypesContent.push(`export type ${getKeyType(owner)} = {`);
      data.forEach(({ key, type }) => {
        metafieldTypesContent.push(
          /[^\w_]/gi.test(key) ? `  "${key}"?: ${getType(type)};` : `  ${key}: ${getType(type)};`
        );
      });
      metafieldTypesContent.push("};\n");
    }
  });

  if (fs.existsSync(path.join(process.cwd(), ".shopify-cms", "types", "metafields.ts"))) {
    const masterFile = metafieldTypesContent.join("\n");

    const currentFile = fs.readFileSync(
      path.join(process.cwd(), ".shopify-cms", "types", "metafields.ts"),
      { encoding: "utf-8" }
    );

    if (masterFile !== currentFile) {
      console.log(chalk.green("updated metafields.ts"));
      fs.writeFileSync(
        path.join(process.cwd(), ".shopify-cms", "types", "metafields.ts"),
        masterFile
      );
    }
  }
}
