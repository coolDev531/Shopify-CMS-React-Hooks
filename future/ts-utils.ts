import { _Article_liquid, _Blog_liquid, _Collection_liquid, _Color_liquid, _Font_liquid, _Image_liquid, _Linklist_liquid, _Page_liquid, _Product_liquid, ShopifySection, ShopifySectionBlock } from "types/shopify";

type ExtractSettings<T extends ShopifySection | ShopifySectionBlock> = Extract<
  T["settings"][number],
  { id: string; type }
>;

type ExtractSetting<T extends ShopifySection | ShopifySectionBlock, ID extends string> = Extract<
  ExtractSettings<T>,
  { id: ID }
>;

type MapSettings<Section extends ShopifySection | ShopifySectionBlock> = {
  [ID in ExtractSettings<Section>["id"]]: ExtractSetting<Section, ID>["type"] extends "article"
    ? _Article_liquid
    : ExtractSetting<Section, ID>["type"] extends "checkbox"
    ? boolean
    : ExtractSetting<Section, ID>["type"] extends "number" | "range"
    ? number
    : ExtractSetting<Section, ID>["type"] extends "radio" | "select"
    ? // @ts-ignore
      ExtractSetting<Section, ID>["options"][number]["value"]
    : ExtractSetting<Section, ID>["type"] extends
        | "text"
        | "textarea"
        | "color_background"
        | "html"
        | "liquid"
        | "url"
        | "font"
    ? string
    : ExtractSetting<Section, ID>["type"] extends "blog"
    ? _Blog_liquid
    : ExtractSetting<Section, ID>["type"] extends "collection"
    ? _Collection_liquid
    : ExtractSetting<Section, ID>["type"] extends "collection_list"
    ? _Collection_liquid[]
    : ExtractSetting<Section, ID>["type"] extends "color"
    ? _Color_liquid
    : ExtractSetting<Section, ID>["type"] extends "font_picker"
    ? _Font_liquid
    : ExtractSetting<Section, ID>["type"] extends "image_picker"
    ? _Image_liquid
    : ExtractSetting<Section, ID>["type"] extends "link_list"
    ? _Linklist_liquid
    : ExtractSetting<Section, ID>["type"] extends "page"
    ? _Page_liquid
    : ExtractSetting<Section, ID>["type"] extends "product"
    ? _Product_liquid
    : ExtractSetting<Section, ID>["type"] extends "product_list"
    ? _Product_liquid[]
    : ExtractSetting<Section, ID>["type"] extends "richtext"
    ? `<p${string}</p>`
    : ExtractSetting<Section, ID>["type"] extends "video_url"
    ? ("youtube" | "vimeo")[]
    : never;
};

type MapSection<T> = {
  // @ts-ignore
  blocks: MapBlocks<T>[keyof MapBlocks<T>][];
  id: string;
  // @ts-ignore
  settings: MapSettings<T>;
  // @ts-ignore
  type: Lowercase<T["name"]>;
};

type MapBlocks<T extends ShopifySection> = {
  [B in Extract<T["blocks"][number], { type }>["type"]]: {
    id: string;
    settings: MapSettings<Extract<T["blocks"][number], { type: B }>>;
    type: B;
  };
};
