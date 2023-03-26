import { _Article_metafields, _Blog_metafields, _Collection_metafields, _Page_metafields, _Product_metafields, _Shop_metafields, _Variant_metafields } from "./metafields";
import { SettingsSchema } from "./settings";

export type ShopifyHeader = {
  content: string;
  type: "header";
  info?: string;
};
export type ShopifyParagraph = {
  content: string;
  type: "paragraph";
  info?: string;
};
export type ShopifyCheckbox = {
  id: string;
  label: string;
  type: "checkbox";
  default?: boolean;
  info?: string;
};
export type ShopifyNumber = {
  id: string;
  label: string;
  type: "number";
  default?: number;
  info?: string;
  placeholder?: number;
};
export type ShopifyRadio = {
  id: string;
  label: string;
  options: { label: string; value: string }[];
  type: "radio";
  default?: string;
  info?: string;
};
export type ShopifyRange = {
  default: number;
  id: string;
  label: string;
  max: number;
  min: number;
  step: number;
  type: "range";
  info?: string;
  unit?: string;
};
export type ShopifySelect = {
  id: string;
  label: string;
  options: { label: string; value: string; group?: string }[];
  type: "select";
  default?: string;
  info?: string;
};
export type ShopifyText = {
  id: string;
  label: string;
  type: "text";
  default?: string;
  info?: string;
  placeholder?: string;
};
export type ShopifyTextarea = {
  id: string;
  label: string;
  type: "textarea";
  default?: string;
  info?: string;
  placeholder?: string;
};
export type ShopifyArticle = {
  id: string;
  label: string;
  type: "article";
  info?: string;
};
export type ShopifyBlog = {
  id: string;
  label: string;
  type: "blog";
  info?: string;
};
export type ShopifyCollection = {
  id: string;
  label: string;
  type: "collection";
  info?: string;
};
export type ShopifyCollection_list = {
  id: string;
  label: string;
  type: "collection_list";
  info?: string;
  limit?: number;
};
export type ShopifyColor = {
  id: string;
  label: string;
  type: "color";
  default?: string;
  info?: string;
};
export type ShopifyColor_background = {
  id: string;
  label: string;
  type: "color_background";
  default?: string;
  info?: string;
};
export type ShopifyFont_picker = {
  default: string;
  id: string;
  label: string;
  type: "font_picker";
  info?: string;
};
export type ShopifyFont = {
  id: string;
  label: string;
  type: "font";
  default?: string;
  info?: string;
};
export type ShopifyHtml = {
  id: string;
  label: string;
  type: "html";
  default?: string;
  info?: string;
  placeholder?: string;
};
export type ShopifyImage_picker = {
  id: string;
  label: string;
  type: "image_picker";
  info?: string;
};
export type ShopifyLink_list = {
  id: string;
  label: string;
  type: "link_list";
  default?: "main-menu" | "footer" | string;
  info?: string;
};
export type ShopifyLiquid = {
  id: string;
  label: string;
  type: "liquid";
  info?: string;
};
export type ShopifyPage = {
  id: string;
  label: string;
  type: "page";
  info?: string;
};
export type ShopifyProduct = {
  id: string;
  label: string;
  type: "product";
  info?: string;
};
export type ShopifyProduct_list = {
  id: string;
  label: string;
  type: "product_list";
  info?: string;
  limit?: number;
};
export type ShopifyRichtext = {
  id: string;
  label: string;
  type: "richtext";
  default?: `<p${string}</p>`;
  info?: string;
};
export type ShopifyUrl = {
  id: string;
  label: string;
  type: "url";
  default?: string;
  info?: string;
};
export type ShopifyVideo_url = {
  accept: ("youtube" | "vimeo")[];
  id: string;
  label: string;
  type: "video_url";
  default?: string;
  info?: string;
  placeholder?: string;
};

export type ShopifySettingsInput =
  | ShopifyCheckbox
  | ShopifyNumber
  | ShopifyRadio
  | ShopifyRange
  | ShopifySelect
  | ShopifyText
  | ShopifyTextarea
  | ShopifyArticle
  | ShopifyBlog
  | ShopifyCollection
  | ShopifyCollection_list
  | ShopifyColor
  | ShopifyColor_background
  | ShopifyFont_picker
  | ShopifyFont
  | ShopifyHtml
  | ShopifyImage_picker
  | ShopifyLink_list
  | ShopifyLiquid
  | ShopifyPage
  | ShopifyProduct
  | ShopifyProduct_list
  | ShopifyRichtext
  | ShopifyUrl
  | ShopifyVideo_url;

type ExtractSettings<T extends ShopifySection | ShopifySectionBlock> = Extract<
  /* @ts-ignore*/
  T["settings"][number],
  { id: string; type: string }
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

type MapBlocks<T extends { blocks: ShopifySectionBlock[] }> = {
  [B in Extract<T["blocks"][number], { type: string }>["type"]]: {
    id: string;
    settings: MapSettings<Extract<T["blocks"][number], { type: B }>>;
    type: B;
  };
};

type MapBlocksPreset<T extends { blocks: ShopifySectionBlock[] }> = {
  [B in Extract<T["blocks"][number], { type: string }>["type"]]: {
    type: B;
    settings?: Partial<MapSettings<Extract<T["blocks"][number], { type: B }>>>;
  };
};

type ShopifySectionDefault<T = never> = {
  blocks?: T extends { blocks: Array<any> }
    ? MapBlocksPreset<T>[keyof MapBlocksPreset<T>][] | undefined
    : never;
  settings?: T extends never
    ? { [T: string]: string | number | boolean } | undefined
    : T extends { settings: any }
    ? Partial<T["settings"]> | undefined
    : { [T: string]: string | number | boolean } | undefined;
};

type ShopifySectionPreset<T = unknown> = {
  name: string;
  blocks?: T extends { blocks: Array<any> }
    ? MapBlocksPreset<T>[keyof MapBlocksPreset<T>][]
    : never;
  settings?: T extends never
    ? { [T: string]: string | number | boolean } | undefined
    : T extends { settings: any }
    ? Partial<T["settings"]> | undefined
    : { [T: string]: string | number | boolean } | undefined;
};

export type ShopifySectionBlock =
  | {
      name: string;
      type: string;
      limit?: number;
      settings?: (ShopifySettingsInput | ShopifyHeader | ShopifyParagraph)[];
    }
  | { type: "@app"; limit?: never; name?: never; settings?: never };

export type ShopifySection<T = never> = {
  name: string;
  blocks?: ShopifySectionBlock[];
  class?: string;
  default?: ShopifySectionDefault<T>;
  limit?: number;
  max_blocks?: number;
  presets?: ShopifySectionPreset<T>[];
  settings?: (ShopifySettingsInput | ShopifyHeader | ShopifyParagraph)[];
  tag?: "article" | "aside" | "div" | "footer" | "header" | "section";
  templates?: (
    | "404"
    | "article"
    | "blog"
    | "cart"
    | "collection"
    | "list-collections"
    | "customers/account"
    | "customers/activate_account"
    | "customers/addresses"
    | "customers/login"
    | "customers/order"
    | "customers/register"
    | "customers/reset_password"
    | "gift_card"
    | "index"
    | "page"
    | "password"
    | "product"
    | "search"
  )[];
};

export type ShopifySettings = (
  | ({
      name: "theme_info";
      theme_author: string;
      theme_documentation_url: string;
      theme_name: string;

      theme_version: string;
    } & (
      | {
          theme_support_email: string;
        }
      | {
          theme_support_url: string;
        }
    ))
  | {
      name: string;
      settings: (ShopifySettingsInput | ShopifyHeader | ShopifyParagraph)[];
    }
)[];

export type _Page_liquid = {
  content: string;
  handle: string;
  id: number;
  metafields: _Page_metafields;
  published_at: string;
  template_suffix: string;
  title: string;
  url: string;
  author?: any;
};

export type _Blog_liquid = {
  all_tags: any[];
  articles: _Article_liquid[];
  articles_count: number;
  handle: string;
  id: number;
  metafields: _Blog_metafields;
  tags: any[];
  title: string;
  url: string;
  comments_enabled?: any;
  moderated?: any;
};

export type _Article_liquid = {
  author: string;
  comment_post_url: string;
  comments: any[];
  comments_count: number;
  content: string;
  created_at: string;
  excerpt: string;
  excerpt_or_content: string;
  featured_media: Omit<_Media_liquid, "media_type" | "position" | "preview_image">;
  handle: string;
  id: number;
  metafields: _Article_metafields;
  published_at: string;
  tags: any[];
  title: string;
  updated_at: string;
  url: string;
  user: {
    account_owner: boolean;
    email: string;
    first_name: string;
    last_name: string;
    bio?: any;
    homepage?: any;
    image?: any;
  };
  comments_enabled?: any;
  image?: any;
  moderated?: any;
};

export type _Variant_liquid_json = {
  available: boolean;
  barcode: string;
  id: number;
  inventory_policy: string;
  inventory_quantity: number;
  name: string;
  option1: string;
  options: string[];
  price: number;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  weight: number;
  compare_at_price?: any;
  featured_image?: any;
  inventory_management?: any;
  option2?: any;
  option3?: any;
  public_title?: any;
};

export type _Product_liquid_json = {
  available: boolean;
  compare_at_price_max: number;
  compare_at_price_min: number;
  compare_at_price_varies: boolean;
  content: string;
  created_at: string;
  description: string;
  handle: string;
  id: number;
  images: any[];
  options: string[];
  price: number;
  price_max: number;
  price_min: number;
  price_varies: boolean;
  published_at: string;
  tags: any[];
  title: string;
  type: string;
  variants: _Variant_liquid_json[];
  vendor: string;
  compare_at_price?: any;
  featured_image?: any;
};

export type _Metafield_liquid_product_reference = {
  type: "product_reference";
  value?: Omit<_Product_liquid, "metafields">;
};
export type _Metafield_liquid_list_product_reference = {
  type: "list.product_reference";
  value?: Omit<_Product_liquid, "metafields">[];
};

export type _Metafield_liquid_variant_reference = {
  type: "variant_reference";
  value?: _Variant_liquid_json;
};
export type _Metafield_liquid_list_variant_reference = {
  type: "list.variant_reference";
  value?: _Variant_liquid_json[];
};
export type _Metafield_liquid_page_reference = {
  type: "page_reference";
  value?: _Page_liquid_json;
};

export type _Metafield_liquid_file_reference_generic = {
  media_type: "generic_file";
  preview_image: {
    aspect_ratio: number;
    height: number;
    src: string;
    width: number;
  };
  url: string;
  alt?: string;
};

export type _Metafield_liquid_file_reference_image = {
  alt: string;
  aspect_ratio: number;
  height: number;
  id: number;
  media_type: "image";
  position: null;
  preview_image: {
    aspect_ratio: number;
    height: number;
    src: string;
    width: number;
  };
  src: string;
  width: number;
};

export type _Metafield_liquid_file_reference = {
  type: "file_reference";
  value?: _Metafield_liquid_file_reference_generic | _Metafield_liquid_file_reference_image;
};

export type _Metafield_liquid_list_file_reference = {
  type: "list.file_reference";
  value?: (_Metafield_liquid_file_reference_generic | _Metafield_liquid_file_reference_image)[];
};

export type _Metafield_liquid_file_reference_force_generic = {
  type: "file_reference";
  value?: _Metafield_liquid_file_reference_generic;
};
export type _Metafield_liquid_file_reference_force_image = {
  type: "file_reference";
  value?: _Metafield_liquid_file_reference_image;
};

export type _Metafield_liquid =
  | {
      type:
        | "color"
        | "date"
        | "date_time"
        | "single_line_text_field"
        | "multi_line_text_field"
        | "url";
      value?: string;
    }
  | {
      type:
        | "list.color"
        | "list.date"
        | "list.date_time"
        | "list.single_line_text_field"
        | "list.multi_line_text_field"
        | "list.page_reference";
      value?: string[];
    }
  | {
      type: "number_integer";
      value?: number;
    }
  | {
      type: "list.number_integer";
      value?: number[];
    }
  | {
      type: "number_decimal";
      value?: number | string;
    }
  | {
      type: "list.number_decimal";
      value?: (number | string)[];
    }
  | {
      type: "json";
      value?: unknown;
    }
  | {
      type: "volume" | "weight" | "dimension";
      value?: { type: string; unit: string; value: number };
    }
  | {
      type: "rating";
      value?: { rating: string; scale_max: string; scale_min: string };
    }
  | _Metafield_liquid_product_reference
  | _Metafield_liquid_list_product_reference
  | _Metafield_liquid_variant_reference
  | _Metafield_liquid_list_variant_reference
  | _Metafield_liquid_page_reference
  | _Metafield_liquid_list_file_reference
  | _Metafield_liquid_file_reference;

export type _Page_liquid_json = {
  content: string;
  handle: string;
  id: number;
  published_at: string;
  template_suffix: string;
  title: string;
  url: string;
  author?: string;
};

export type _Variant_liquid = {
  available: boolean;
  barcode: string;
  id: number;
  inventory_policy: string;
  inventory_quantity: number;
  metafields: _Variant_metafields;
  option1: string;
  options: string[];
  price: number;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  url: string;
  weight: number;
  compare_at_price?: any;
  featured_media?: _Media_liquid;
  image?: any;
  inventory_management?: any;
  option2?: any;
  option3?: any;
};

export type _Product_liquid = {
  available: boolean;
  collections: {
    body_html: string;
    disjunctive: boolean;
    handle: string;
    id: number;
    published_at: string;
    published_scope: string;
    rules: {
      column: string;
      condition: string;
      relation: string;
    }[];
    sort_order: string;
    template_suffix: string;
    title: string;
    updated_at: string;
  }[];
  compare_at_price_max: number;
  compare_at_price_min: number;
  compare_at_price_varies: boolean;
  content: string;
  created_at: string;
  description: string;
  handle: string;
  id: number;
  images: any[];
  media: _Media_liquid[];
  metafields: _Product_metafields;
  options: string[];
  options_with_values: { name: string; position: 1 | 2 | 3; values: string[] }[];
  page_description: string;
  price: number;
  price_max: number;
  price_min: number;
  price_varies: boolean;
  published_at: string;
  tags: string[];
  template_suffix: string;
  title: string;
  type: string;
  url: string;
  variants: _Variant_liquid[];
  vendor: string;
  compare_at_price?: number;
  featured_image?: string;
  featured_media?: _Media_liquid;
};

export type _Media_liquid = {
  aspect_ratio: number;
  height: number;
  id: number;
  media_type: string;
  position: number;
  preview_image: {
    aspect_ratio: number;
    height: number;
    src: string;
    width: number;
  };
  src: string;
  width: number;
  alt?: string;
  external_id?: string;
  host?: "youtube" | "vimeo";
};

export type _Collection_liquid = {
  all_products_count: number;
  all_tags: string[];
  all_types: string[];
  all_vendors: string[];
  default_sort_by: _Collection_sort_options[number][0];
  description: string;
  filters: _Collection_filter[];
  handle: string;
  id: number;
  metafields: _Collection_metafields;
  products: _Product_liquid[];
  products_count: number;
  published_at: string;
  sort_by: _Collection_sort_options[number][0];
  sort_options: _Collection_sort_options;
  tags: string[];
  template_suffix: string;
  title: string;
  url: string;
  featured_image?: _Media_liquid;
  image?: _Media_liquid;
  product_pagination?: _Pagination_liquid;
  products_best_selling?: string[];
  products_manual?: string[];
};

export type _Collection_sort_options = [
  ["manual", string],
  ["best-selling", string],
  ["title-ascending", string],
  ["title-descending", string],
  ["price-ascending", string],
  ["price-descending", string],
  ["created-ascending", string],
  ["created-descending", string]
];

export type _Collection_filter = {
  active_values: _Collection_filter_value[];
  inactive_values: _Collection_filter_value[];
  label: string;
  max_value: _Collection_filter_value;
  min_value: _Collection_filter_value;
  param_name: string;
  type: string;
  url_to_remove: string;
  values: _Collection_filter_value[];
  false_value?: _Collection_filter_value;
  range_max?: number;
  true_value?: _Collection_filter_value;
};
export type _Collection_filter_value = {
  active: boolean;
  count: number;
  label: string;
  param_name: string;
  url_to_add: string;
  url_to_remove: string;
  value: string;
};

export type _Pagination_liquid = {
  current_offset: number;
  current_page: number;
  items: number;
  page_size: number;
  pages: number;
  parts: _Pagination_liquid_part[];
  next?: _Pagination_liquid_part;
  previous?: _Pagination_liquid_part;
};

type _Pagination_liquid_part = {
  is_link: boolean;
  title: string;
  url: string;
};

export type _Link_liquid = {
  active: boolean;
  child_active: boolean;
  child_current: boolean;
  current: boolean;
  handle: string;
  levels: number;
  links: _Link_liquid[];
  title: string;
  url: string;
} & (
  | {
      type: "product_link";
      object?: _Product_liquid;
    }
  | {
      type: "collection_link";
      object?: _Collection_liquid;
    }
  | {
      type: "article_link";
      object?: _Article_liquid;
    }
  | {
      type: "blog_link";
      object?: _Blog_liquid;
    }
  | {
      type: "page_link";
      object?: _Page_liquid;
    }
  | {
      type: "policy_link";
      object?: string;
    }
  | {
      type: "http_link";
      object?: null;
    }
  | {
      type: "frontpage_link";
      object?: null;
    }
  | {
      type: "collections_link";
      object?: null;
    }
  | {
      type: "catalog_link";
      object?: null;
    }
);

export type _Linklist_liquid = {
  handle: string;
  levels: number;
  links: _Link_liquid[];
  title: string;
};

export type _Color_liquid = {
  alpha: number;
  blue: number;
  green: number;
  hex: string;
  hue: number;
  lightness: number;
  red: number;
  rgb: string;
  saturation: number;
};

export type _Font_liquid = {
  baseline_ratio: number;
  fallback_families: string;
  family: string;
  style: string;
  variants: Omit<_Font_liquid, "variants">[];
  weight: string;
  system?: any;
};

export type _LinkLists_liquid = _Linklist_liquid[];

export type _Image_liquid = {
  alt: string;
  aspect_ratio: number;
  height: number;
  id: string;
  src: string;
  width: number;
  media_type?: any;
  preview_image?: any;
  variants?: any;
};

export type _Shop_liquid_json = {
  address: {
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    country_code: string;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    first_name?: any;
    last_name?: any;
    latitude?: any;
    longitude?: any;
  };
  address_city: string;
  address_company: string;
  address_country: string;
  address_country_upper: string;
  address_province: string;
  address_province_code: string;
  address_street: string;
  address_summary: string;
  address_zip: string;
  "checkout.guest_login": boolean;
  collections_count: number;
  currency: string;
  customer_accounts_enabled: boolean;
  customer_accounts_optional: boolean;
  description: string;
  domain: string;
  email: string;
  enabled_payment_types: string[];
  id: number;
  metafields: _Shop_metafields;
  money_format: string;
  money_with_currency_format: string;
  name: string;
  password_message: string;
  permanent_domain: string;
  phone: string;
  policies: any[];
  products_count: number;
  published_locales: {
    shop_locale: {
      enabled: boolean;
      locale: string;
      primary: boolean;
      published: boolean;
    };
  }[];
  secure_url: string;
  types: string[];
  url: string;
  vendors: string[];
  privacy_policy?: any;
  refund_policy?: any;
  shipping_policy?: any;
  subscription_policy?: any;
  terms_of_service?: any;
};

export type _Request_liquid = {
  design_mode: boolean;
  host: string;
  locale: {
    shop_locale: {
      enabled: boolean;
      locale: string;
      primary: boolean;
      published: boolean;
    };
  };
  origin: string;
  page_type: string;
  path: string;
};

export type _Routes_liquid = {
  account_addresses_url: string;
  account_login_url: string;
  account_logout_url: string;
  account_recover_url: string;
  account_register_url: string;
  account_url: string;
  all_products_collection_url: string;
  cart_add_url: string;
  cart_change_url: string;
  cart_clear_url: string;
  cart_update_url: string;
  cart_url: string;
  collections_url: string;
  predictive_search_url: string;
  product_recommendations_url: string;
  root_url: string;
  search_url: string;
  host?: string;
};

export type _Recommendations_liquid = {
  performed: boolean;
  products: _Product_liquid[];
  products_count: number;
};

export type GlobalSettings = {
  article?: _Article_liquid;
  blog?: _Blog_liquid;
  collection?: _Collection_liquid;
  description?: string;
  handle?: string;
  linklists?: _Linklist_liquid[];
  page?: _Page_liquid_json;
  product?: _Product_liquid;
  recommendations?: _Recommendations_liquid;
  request?: _Request_liquid;
  routes?: _Routes_liquid;
  settings?: SettingsSchema;
  shop?: _Shop_liquid_json;
  template?: string;
  title?: string;
};

export type _Font_options =
  | "mono"
  | "sans-serif"
  | "serif"
  | "abel_n4"
  | "abril_fatface_n4"
  | "agmena_n4"
  | "akko_n4"
  | "alegreya_n4"
  | "alegreya_sans_n4"
  | "alfie_n4"
  | "americana_n4"
  | "amiri_n4"
  | "anonymous_pro_n4"
  | "antique_olive_n4"
  | "arapey_n4"
  | "archivo_n4"
  | "archivo_narrow_n4"
  | "arimo_n4"
  | "armata_n4"
  | "arvo_n4"
  | "asap_n4"
  | "assistant_n4"
  | "asul_n4"
  | "avenir_next_n4"
  | "avenir_next_rounded_n4"
  | "azbuka_n4"
  | "basic_commercial_n4"
  | "basic_commercial_soft_rounded_n4"
  | "baskerville_no_2_n4"
  | "bauer_bodoni_n4"
  | "beefcakes_n4"
  | "bembo_book_n4"
  | "bernhard_modern_n4"
  | "bio_rhyme_n4"
  | "bitter_n4"
  | "bodoni_poster_n9"
  | "burlingame_n4"
  | "cabin_n4"
  | "cachet_n4"
  | "cardamon_n4"
  | "cardo_n4"
  | "carter_sans_n4"
  | "caslon_bold_n4"
  | "caslon_old_face_n4"
  | "catamaran_n4"
  | "centaur_n4"
  | "century_gothic_n4"
  | "chivo_n4"
  | "chong_modern_n4"
  | "claire_news_n3"
  | "cooper_bt_n5"
  | "courier_new_n4"
  | "crimson_text_n4"
  | "din_neuzeit_grotesk_n3"
  | "din_next_n4"
  | "din_next_slab_n4"
  | "daytona_n4"
  | "domine_n4"
  | "dosis_n4"
  | "electra_n4"
  | "eurostile_next_n4"
  | "ff_meta_n4"
  | "ff_meta_serif_n4"
  | "ff_tisa_n4"
  | "ff_tisa_sans_n4"
  | "ff_unit_n4"
  | "ff_unit_rounded_n4"
  | "ff_unit_slab_n4"
  | "fette_gotisch_n4"
  | "fira_sans_n4"
  | "fjalla_one_n4"
  | "friz_quadrata_n4"
  | "frutiger_serif_n4"
  | "futura_n4"
  | "futura_black_n4"
  | "garamond_n4"
  | "geometric_415_n4"
  | "georgia_pro_n4"
  | "gill_sans_nova_n4"
  | "glegoo_n4"
  | "goudy_old_style_n4"
  | "harmonia_sans_n4"
  | "helvetica_n4"
  | "humanist_521_n4"
  | "ibm_plex_sans_n4"
  | "itc_avant_garde_gothic_n4"
  | "itc_benguiat_n4"
  | "itc_berkeley_old_style_n4"
  | "itc_bodoni_seventytwo_n4"
  | "itc_bodoni_twelve_n4"
  | "itc_caslon_no_224_n4"
  | "itc_charter_n4"
  | "itc_cheltenham_n4"
  | "itc_clearface_n4"
  | "itc_conduit_n4"
  | "itc_esprit_n4"
  | "itc_founders_caslon_n4"
  | "itc_franklin_gothic_n4"
  | "itc_galliard_n4"
  | "itc_gamma_n4"
  | "itc_goudy_sans_n4"
  | "itc_johnston_n5"
  | "itc_mendoza_roman_n4"
  | "itc_modern_no_216_n5"
  | "itc_new_baskerville_n4"
  | "itc_new_esprit_n4"
  | "itc_new_veljovic_n4"
  | "itc_novarese_n4"
  | "itc_officina_sans_n4"
  | "itc_officina_serif_n4"
  | "itc_stepp_n4"
  | "itc_stone_humanist_n5"
  | "itc_stone_informal_n4"
  | "itc_stone_sans_ii_n4"
  | "itc_stone_serif_n4"
  | "itc_tapioca_n5"
  | "inconsolata_n4"
  | "joanna_nova_n4"
  | "joanna_sans_nova_n4"
  | "josefin_sans_n4"
  | "josefin_slab_n4"
  | "kairos_n4"
  | "kalam_n4"
  | "karla_n4"
  | "kreon_n4"
  | "lato_n4"
  | "laurentian_n4"
  | "libelle_n4"
  | "libre_baskerville_n4"
  | "libre_franklin_n4"
  | "linotype_didot_n4"
  | "linotype_gianotten_n4"
  | "linotype_really_n5"
  | "linotype_syntax_serif_n4"
  | "lobster_n4"
  | "lobster_two_n4"
  | "lora_n4"
  | "lucia_n4"
  | "lucida_grande_n4"
  | "luthersche_fraktur_n4"
  | "madera_n4"
  | "malabar_n4"
  | "mariposa_sans_n4"
  | "maven_pro_n4"
  | "megrim_n4"
  | "melior_n4"
  | "memphis_n5"
  | "memphis_soft_rounded_n5"
  | "mentor_sans_n4"
  | "merriweather_sans_n4"
  | "metro_nova_n4"
  | "modern_no_20_n4"
  | "monaco_n4"
  | "monotype_baskerville_n4"
  | "monotype_bodoni_n4"
  | "monotype_century_old_style_n5"
  | "monotype_goudy_n4"
  | "monotype_goudy_modern_n4"
  | "monotype_italian_old_style_n4"
  | "monotype_new_clarendon_n5"
  | "monotype_news_gothic_n4"
  | "monotype_sabon_n4"
  | "montserrat_n4"
  | "mouse_memoirs_n4"
  | "muli_n4"
  | "mundo_sans_n4"
  | "neo_sans_n4"
  | "neue_aachen_n4"
  | "neue_frutiger_1450_n4"
  | "neue_haas_unica_n4"
  | "neue_plak_n4"
  | "neue_swift_n4"
  | "neuton_n4"
  | "neuzeit_office_n4"
  | "neuzeit_office_soft_rounded_n4"
  | "neuzeit_s_n4"
  | "new_century_schoolbook_n4"
  | "news_702_n4"
  | "news_705_n4"
  | "news_cycle_n4"
  | "news_gothic_no_2_n4"
  | "news_plantin_n4"
  | "nobile_n4"
  | "noticia_text_n4"
  | "noto_serif_n4"
  | "nunito_n4"
  | "nunito_sans_n4"
  | "old_standard_tt_n4"
  | "open_sans_n4"
  | "open_sans_condensed_n3"
  | "optima_nova_n4"
  | "oswald_n4"
  | "ovo_n4"
  | "oxygen_n4"
  | "pmn_caecilia_n4"
  | "pt_mono_n4"
  | "pt_sans_n4"
  | "pt_sans_narrow_n4"
  | "pt_serif_n4"
  | "pacifico_n4"
  | "palatino_n4"
  | "parma_n4"
  | "perpetua_n4"
  | "plantin_n4"
  | "playball_n4"
  | "playfair_display_n4"
  | "poppins_n4"
  | "prata_n4"
  | "prompt_n4"
  | "quantico_n4"
  | "quattrocento_n4"
  | "quattrocento_sans_n4"
  | "questrial_n4"
  | "quicksand_n4"
  | "quire_sans_n4"
  | "rajdhani_n4"
  | "raleway_n4"
  | "really_no_2_n4"
  | "righteous_n4"
  | "roboto_n4"
  | "roboto_condensed_n4"
  | "roboto_mono_n4"
  | "roboto_slab_n4"
  | "rockwell_n4"
  | "rubik_n4"
  | "sabon_next_n4"
  | "sackers_square_gothic_n4"
  | "sagrantino_n4"
  | "scene_n4"
  | "scherzo_n4"
  | "shadows_into_light_n4"
  | "slabo_13px_n4"
  | "slate_n4"
  | "soho_n4"
  | "soho_gothic_n4"
  | "source_code_pro_n4"
  | "source_sans_pro_n4"
  | "stempel_schneidler_n4"
  | "swiss_721_n4"
  | "swiss_721_rounded_n7"
  | "tenor_sans_n4"
  | "tiemann_n4"
  | "times_new_roman_n4"
  | "tinos_n4"
  | "titillium_web_n4"
  | "trade_gothic_n4"
  | "trade_gothic_next_n4"
  | "trebuchet_ms_n4"
  | "twentieth_century_n4"
  | "ubuntu_n4"
  | "unica_one_n4"
  | "univers_next_n4"
  | "univers_next_typewriter_n4"
  | "unna_n4"
  | "vala_n4"
  | "varela_n4"
  | "varela_round_n4"
  | "verdana_pro_n4"
  | "vidaloka_n4"
  | "volkhov_n4"
  | "vollkorn_n4"
  | "waza_n4"
  | "wola_n4"
  | "work_sans_n4"
  | "ysobel_n4"
  | "zurich_n4"
  | "zurich_extended_n4";
