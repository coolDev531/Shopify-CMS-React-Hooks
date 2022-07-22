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

type ShopifySectionDefault<T = never> = {
  blocks?: T extends never
    ? {
        settings: { [T: string]: string | number | boolean };
        type: "step";
      }[]
    : T extends { blocks }
    ? Partial<Omit<T["blocks"][number], "id">>[]
    : {
        settings: { [T: string]: string | number | boolean };
        type: "step";
      }[];
  settings?: T extends never
    ? { [T: string]: string | number | boolean }
    : T extends { settings }
    ? T["settings"]
    : { [T: string]: string | number | boolean };
};

type ShopifySectionPreset<T = never> = {
  name: string;
  blocks?: T extends never
    ? {
        settings: { [T: string]: string | number | boolean };
        type: "step";
      }[]
    : T extends { blocks }
    ? Partial<Omit<T["blocks"][number], "id">>[]
    : {
        settings: { [T: string]: string | number | boolean };
        type: "step";
      }[];
  settings?: T extends never
    ? { [T: string]: string | number | boolean }
    : T extends { settings }
    ? T["settings"]
    : { [T: string]: string | number | boolean };
};

export type ShopifySectionBlock = {
  name: string;
  type: string;
  limit?: number;
  settings?: (ShopifySettingsInput | ShopifyHeader | ShopifyParagraph)[];
};

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
  templates?:
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
    | "search";
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
  metafields: _Metafield_liquid[];
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
  metafields: _Metafield_liquid[];
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
  metafields: _Metafield_liquid[];
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
  key?: string;
  namespace?: string;
  value?: _Product_liquid_json;
};
export type _Metafield_liquid_list_product_reference = {
  type: "list.product_reference";
  key?: string;
  namespace?: string;
  value?: _Product_liquid_json[];
};

export type _Metafield_liquid_variant_reference = {
  type: "variant_reference";
  key?: string;
  namespace?: string;
  value?: _Variant_liquid_json;
};
export type _Metafield_liquid_list_variant_reference = {
  type: "list.variant_reference";
  key?: string;
  namespace?: string;
  value?: _Variant_liquid_json[];
};
export type _Metafield_liquid_page_reference = {
  type: "page_reference";
  key?: string;
  namespace?: string;
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
  key?: string;
  namespace?: string;
  value?: _Metafield_liquid_file_reference_generic | _Metafield_liquid_file_reference_image;
};

export type _Metafield_liquid_file_reference_force_generic = {
  type: "file_reference";
  key?: string;
  namespace?: string;
  value?: _Metafield_liquid_file_reference_generic;
};
export type _Metafield_liquid_file_reference_force_image = {
  type: "file_reference";
  key?: string;
  namespace?: string;
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
      key?: string;
      namespace?: string;
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
      key?: string;
      namespace?: string;
      value?: string[];
    }
  | {
      type: "number_integer";
      key?: string;
      namespace?: string;
      value?: number;
    }
  | {
      type: "list.number_integer";
      key?: string;
      namespace?: string;
      value?: number[];
    }
  | {
      type: "number_decimal";
      key?: string;
      namespace?: string;
      value?: number | string;
    }
  | {
      type: "list.number_decimal";
      key?: string;
      namespace?: string;
      value?: (number | string)[];
    }
  | {
      type: "json";
      key?: string;
      namespace?: string;
      value?: unknown;
    }
  | {
      type: "volume" | "weight" | "dimension";
      key?: string;
      namespace?: string;
      value?: {
        type: string;
        unit: string;
        value: number;
      };
    }
  | {
      type: "rating";
      key?: string;
      namespace?: string;
      value?: {
        rating: string;
        scale_max: string;
        scale_min: string;
      };
    }
  | _Metafield_liquid_product_reference
  | _Metafield_liquid_list_product_reference
  | _Metafield_liquid_variant_reference
  | _Metafield_liquid_list_variant_reference
  | _Metafield_liquid_page_reference
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
  metafields: _Metafield_liquid[];
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
  metafields: _Metafield_liquid[];
  options: string[];
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
};

export type _Collection_liquid = {
  all_products_count: number;
  all_tags: string[];
  all_types: string[];
  all_vendors: string[];
  default_sort_by: string;
  description: string;
  filters: any[];
  handle: string;
  id: number;
  metafields: _Metafield_liquid[];
  products: _Product_liquid[];
  products_count: number;
  published_at: string;
  tags: string[];
  template_suffix: string;
  title: string;
  url: string;
  featured_image?: any;
  image?: any;
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

export type GlobalSettings = {
  description: string;
  handle: string;
  linklists: _Linklist_liquid[];
  product: _Product_liquid_json;
  request: _Request_liquid;
  settings: SettingsSchema;
  shop: _Shop_liquid_json;
  template: string;
  title: string;
  article?: _Article_liquid;
  blog?: _Blog_liquid;
  collection?: _Collection_liquid;
  page?: _Page_liquid_json;
};
