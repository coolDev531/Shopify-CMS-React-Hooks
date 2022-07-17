import { _Image_liquid, _Product_liquid, _Linklist_liquid, _Blog_liquid, _Collection_liquid, _Color_liquid, _Page_liquid, _Article_liquid, _Font_liquid } from "types/shopify";

export type BackgroundSection = {
  blocks: BackgroundBlocks[];
  id: string;
  type: "background";
};

export type BackgroundBlocks = {
  id: string;
  settings: {
    /** Input type: range */
    height: number;
    /** Input type: range */
    marginTop: number;
    /** Input type: range */
    opacity: number;
    /** Input type: radio */
    type: "all" | "mobile" | "mobile_tablet" | "tablet" | "tablet_desktop" | "desktop";
    /** Input type: color_background */
    color?: string;
    /** Input type: textarea */
    css?: string;
    /** Input type: image_picker */
    image?: _Image_liquid;
    /** Input type: textarea */
    svg?: string;
    /** Input type: text */
    title?: string;
  };
  type: "bg";
};

export type BlockquoteSection = {
  id: string;
  settings: {
    /** Input type: checkbox */
    quotation_marks: boolean;
    /** Input type: text */
    author?: string;
    /** Input type: text */
    job_title?: string;
    /** Input type: textarea */
    quote?: string;
  };
  type: "blockquote";
};

export type ContactSection = {
  blocks: ContactBlocks[];
  id: string;
  settings: {
    /** Input type: richtext */
    address?: `<p${string}</p>`;
    /** Input type: text */
    contact_title?: string;
    /** Input type: richtext */
    email?: `<p${string}</p>`;
    /** Input type: richtext */
    hours?: `<p${string}</p>`;
    /** Input type: richtext */
    info_paragraph?: `<p${string}</p>`;
    /** Input type: text */
    info_title?: string;
    /** Input type: richtext */
    phone?: `<p${string}</p>`;
    /** Input type: text */
    sub_title?: string;
    /** Input type: richtext */
    submit_paragraph?: `<p${string}</p>`;
    /** Input type: richtext */
    success_paragraph?: `<p${string}</p>`;
    /** Input type: text */
    title?: string;
  };
  type: "contact";
};

export type ContactBlocks =
  | {
      id: string;
      settings: {
        /** Input type: select */
        autocomplete:
          | "off"
          | "name"
          | "honorific-prefix"
          | "given-name"
          | "additional-name"
          | "family-name"
          | "honorific-suffix"
          | "nickname"
          | "email"
          | "username"
          | "new-password"
          | "current-password"
          | "one-time-code"
          | "organization-title"
          | "organization"
          | "street-address"
          | "address-line1, address-line2, address-line3"
          | "address-level4"
          | "address-level3"
          | "address-level2"
          | "address-level1"
          | "country"
          | "country-name"
          | "postal-code"
          | "cc-name"
          | "cc-given-name"
          | "cc-additional-name"
          | "cc-family-name"
          | "cc-number"
          | "cc-exp"
          | "cc-exp-month"
          | "cc-exp-year"
          | "cc-csc"
          | "cc-type"
          | "transaction-currency"
          | "transaction-amount"
          | "language"
          | "bday"
          | "bday-day"
          | "bday-month"
          | "bday-year"
          | "sex"
          | "tel"
          | "tel-country-code"
          | "tel-national"
          | "tel-area-code"
          | "tel-local"
          | "tel-extension"
          | "impp"
          | "url"
          | "photo";
        /** Input type: checkbox */
        required: boolean;
        /** Input type: radio */
        size: "half" | "full";
        /** Input type: select */
        type: "text" | "textarea" | "email" | "password" | "number" | "tel" | "url" | "date";
        /** Input type: textarea */
        error_message?: string;
        /** Input type: text */
        placeholder?: string;
        /** Input type: text */
        title?: string;
      };
      type: "basic";
    }
  | {
      id: string;
      settings: {
        /** Input type: select */
        autocomplete:
          | "off"
          | "name"
          | "honorific-prefix"
          | "given-name"
          | "additional-name"
          | "family-name"
          | "honorific-suffix"
          | "nickname"
          | "email"
          | "username"
          | "new-password"
          | "current-password"
          | "one-time-code"
          | "organization-title"
          | "organization"
          | "street-address"
          | "address-line1, address-line2, address-line3"
          | "address-level4"
          | "address-level3"
          | "address-level2"
          | "address-level1"
          | "country"
          | "country-name"
          | "postal-code"
          | "cc-name"
          | "cc-given-name"
          | "cc-additional-name"
          | "cc-family-name"
          | "cc-number"
          | "cc-exp"
          | "cc-exp-month"
          | "cc-exp-year"
          | "cc-csc"
          | "cc-type"
          | "transaction-currency"
          | "transaction-amount"
          | "language"
          | "bday"
          | "bday-day"
          | "bday-month"
          | "bday-year"
          | "sex"
          | "tel"
          | "tel-country-code"
          | "tel-national"
          | "tel-area-code"
          | "tel-local"
          | "tel-extension"
          | "impp"
          | "url"
          | "photo";
        /** Input type: range */
        lines: number;
        /** Input type: checkbox */
        required: boolean;
        /** Input type: radio */
        size: "half" | "full";
        /** Input type: textarea */
        error_message?: string;
        /** Input type: text */
        placeholder?: string;
        /** Input type: text */
        title?: string;
      };
      type: "textarea";
    }
  | {
      id: string;
      settings: {
        /** Input type: checkbox */
        required: boolean;
        /** Input type: radio */
        type: "radio" | "checkbox";
        /** Input type: textarea */
        error_message?: string;
        /** Input type: textarea */
        options?: string;
        /** Input type: text */
        title?: string;
      };
      type: "group";
    }
  | {
      id: string;
      settings: {
        /** Input type: checkbox */
        required: boolean;
        /** Input type: radio */
        size: "half" | "full";
        /** Input type: textarea */
        error_message?: string;
        /** Input type: textarea */
        options?: string;
        /** Input type: text */
        title?: string;
      };
      type: "select";
    }
  | {
      id: string;
      type: "separator";
    };

export type FeatureCarouselSection = {
  blocks: FeatureCarouselBlocks[];
  id: string;
  settings: {
    /** Input type: select */
    position: "left" | "center" | "right";
    /** Input type: text */
    cta1?: string;
    /** Input type: url */
    cta1_link?: string;
    /** Input type: text */
    cta2?: string;
    /** Input type: url */
    cta2_link?: string;
    /** Input type: product_list */
    features?: _Product_liquid[];
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: text */
    title?: string;
  };
  type: "feature-carousel";
};

export type FeatureCarouselBlocks = {
  id: string;
  settings: {
    /** Input type: image_picker */
    image?: _Image_liquid;
    /** Input type: url */
    link?: string;
    /** Input type: textarea */
    paragraph?: string;
    /** Input type: text */
    title?: string;
  };
  type: "manual-feature";
};

export type FeatureListSection = {
  blocks: FeatureListBlocks[];
  id: string;
  settings: {
    /** Input type: select */
    position: "left" | "center" | "right";
    /** Input type: text */
    cta1?: string;
    /** Input type: url */
    cta1_link?: string;
    /** Input type: text */
    cta2?: string;
    /** Input type: url */
    cta2_link?: string;
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: text */
    title?: string;
  };
  type: "feature-list";
};

export type FeatureListBlocks = {
  id: string;
  settings: {
    /** Input type: select */
    icon:
      | "BadgeCheckIcon"
      | "CameraIcon"
      | "ChatAlt2Icon"
      | "ColorSwatchIcon"
      | "CloudIcon"
      | "DesktopComputerIcon"
      | "CubeTransparentIcon"
      | "DeviceMobileIcon"
      | "DeviceTabletIcon"
      | "CursorClickIcon"
      | "HeartIcon"
      | "KeyIcon"
      | "LightningBoltIcon"
      | "LinkIcon"
      | "LightBulbIcon"
      | "LockClosedIcon"
      | "LockOpenIcon"
      | "PaperAirplaneIcon"
      | "ShoppingBagIcon"
      | "ShoppingCartIcon"
      | "SparklesIcon"
      | "TagIcon"
      | "TruckIcon"
      | "UserGroupIcon"
      | "AnnotationIcon"
      | "MailIcon"
      | "MailOpenIcon"
      | "brutalist"
      | "colors"
      | "elegant"
      | "filters"
      | "grid"
      | "playful"
      | "shadows"
      | "simple"
      | "sizing"
      | "transforms"
      | "typography"
      | "ui-avatar"
      | "ui-code"
      | "ui-cursor"
      | "ui-mobile"
      | "ui-responsive"
      | "ui-stack"
      | "ui-1"
      | "ui-2"
      | "ui-3"
      | "ui-4"
      | "CalendarLight"
      | "ChatLight"
      | "Code"
      | "DeliveryLight"
      | "ExchangeSimple"
      | "FastCheckoutLight"
      | "GiftCardLight"
      | "PlanetLight"
      | "Resize"
      | "ReturnsLight"
      | "ShippingSimple"
      | "Stack"
      | "WarrantyLight"
      | "WarrantySimple"
      | "server-2"
      | "server-8"
      | "up-align-1-light"
      | "columns-1-light"
      | "laptop-star-light"
      | "squares-1-light"
      | "cubes-light";
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: richtext */
    paragraph_old?: `<p${string}</p>`;
    /** Input type: text */
    title?: string;
  };
  type: "feature";
};

export type FooterSection = {
  blocks: FooterBlocks[];
  id: string;
  settings: {
    /** Input type: url */
    facebook?: string;
    /** Input type: url */
    github?: string;
    /** Input type: url */
    google?: string;
    /** Input type: url */
    instagram?: string;
  };
  type: "footer";
};

export type FooterBlocks = {
  id: string;
  settings: {
    /** Input type: link_list */
    menu?: _Linklist_liquid;
  };
  type: "menu";
};

export type HeaderSection = {
  blocks: HeaderBlocks[];
  id: string;
  settings: {
    /** Input type: image_picker */
    logo?: _Image_liquid;
    /** Input type: link_list */
    menu?: _Linklist_liquid;
  };
  type: "header";
};

export type HeaderBlocks =
  | {
      id: string;
      settings: {
        /** Input type: text */
        handle?: string;
        /** Input type: product_list */
        menu_items?: _Product_liquid[];
      };
      type: "dropdown_menu_features";
    }
  | {
      id: string;
      settings: {
        /** Input type: text */
        handle?: string;
        /** Input type: blog */
        menu_items?: _Blog_liquid;
      };
      type: "dropdown_menu_carousel";
    }
  | {
      id: string;
      settings: {
        /** Input type: text */
        handle?: string;
        /** Input type: image_picker */
        image_1?: _Image_liquid;
        /** Input type: image_picker */
        image_2?: _Image_liquid;
        /** Input type: url */
        link_1?: string;
        /** Input type: url */
        link_2?: string;
        /** Input type: text */
        title_1?: string;
        /** Input type: text */
        title_2?: string;
      };
      type: "dropdown_menu_portfolio";
    };

export type HeadingSection = {
  id: string;
  settings: {
    /** Input type: select */
    position: "left" | "center" | "right";
    /** Input type: text */
    cta1?: string;
    /** Input type: url */
    cta1_link?: string;
    /** Input type: text */
    cta2?: string;
    /** Input type: url */
    cta2_link?: string;
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: text */
    title?: string;
  };
  type: "heading";
};

export type HeroWithFeaturesSection = {
  blocks: HeroWithFeaturesBlocks[];
  id: string;
  settings: {
    /** Input type: text */
    cta1?: string;
    /** Input type: url */
    cta1_link?: string;
    /** Input type: text */
    cta2?: string;
    /** Input type: url */
    cta2_link?: string;
    /** Input type: image_picker */
    image_1?: _Image_liquid;
    /** Input type: image_picker */
    image_2?: _Image_liquid;
    /** Input type: image_picker */
    image_3?: _Image_liquid;
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: product_list */
    tech?: _Product_liquid[];
    /** Input type: text */
    title?: string;
  };
  type: "hero-with-features";
};

export type HeroWithFeaturesBlocks = {
  id: string;
  settings: {
    /** Input type: select */
    icon:
      | "BadgeCheckIcon"
      | "CameraIcon"
      | "ChatAlt2Icon"
      | "ColorSwatchIcon"
      | "CloudIcon"
      | "DesktopComputerIcon"
      | "CubeTransparentIcon"
      | "DeviceMobileIcon"
      | "DeviceTabletIcon"
      | "CursorClickIcon"
      | "HeartIcon"
      | "KeyIcon"
      | "LightningBoltIcon"
      | "LinkIcon"
      | "LightBulbIcon"
      | "LockClosedIcon"
      | "LockOpenIcon"
      | "PaperAirplaneIcon"
      | "ShoppingBagIcon"
      | "ShoppingCartIcon"
      | "SparklesIcon"
      | "TagIcon"
      | "TruckIcon"
      | "UserGroupIcon"
      | "AnnotationIcon"
      | "MailIcon"
      | "MailOpenIcon"
      | "brutalist"
      | "colors"
      | "elegant"
      | "filters"
      | "grid"
      | "playful"
      | "shadows"
      | "simple"
      | "sizing"
      | "transforms"
      | "typography"
      | "ui-avatar"
      | "ui-code"
      | "ui-cursor"
      | "ui-mobile"
      | "ui-responsive"
      | "ui-stack"
      | "ui-1"
      | "ui-2"
      | "ui-3"
      | "ui-4"
      | "CalendarLight"
      | "ChatLight"
      | "Code"
      | "DeliveryLight"
      | "ExchangeSimple"
      | "FastCheckoutLight"
      | "GiftCardLight"
      | "PlanetLight"
      | "Resize"
      | "ReturnsLight"
      | "ShippingSimple"
      | "Stack"
      | "WarrantyLight"
      | "WarrantySimple"
      | "server-2"
      | "server-8"
      | "up-align-1-light"
      | "columns-1-light"
      | "laptop-star-light"
      | "squares-1-light"
      | "cubes-light";
    /** Input type: textarea */
    paragraph?: string;
    /** Input type: text */
    title?: string;
  };
  type: "feature";
};

export type HeroSection = {
  id: string;
  settings: {
    /** Input type: image_picker */
    image?: _Image_liquid;
    /** Input type: richtext */
    list?: `<p${string}</p>`;
    /** Input type: text */
    list_title?: string;
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: text */
    title?: string;
  };
  type: "hero";
};

export type ImageCarouselSection = {
  blocks: ImageCarouselBlocks[];
  id: string;
  settings: {
    /** Input type: checkbox */
    animate: boolean;
    /** Input type: range */
    animation_duration: number;
    /** Input type: select */
    position: "left" | "center" | "right";
    /** Input type: blog */
    blog?: _Blog_liquid;
    /** Input type: collection */
    collection?: _Collection_liquid;
    /** Input type: text */
    cta1?: string;
    /** Input type: url */
    cta1_link?: string;
    /** Input type: text */
    cta2?: string;
    /** Input type: url */
    cta2_link?: string;
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: product_list */
    products?: _Product_liquid[];
    /** Input type: text */
    title?: string;
  };
  type: "image-carousel";
};

export type ImageCarouselBlocks = {
  id: string;
  settings: {
    /** Input type: image_picker */
    image?: _Image_liquid;
    /** Input type: url */
    link?: string;
    /** Input type: text */
    title?: string;
  };
  type: "manual-image";
};

export type ImageGallerySection = {
  id: string;
  settings: {
    /** Input type: image_picker */
    image1?: _Image_liquid;
    /** Input type: image_picker */
    image2?: _Image_liquid;
    /** Input type: image_picker */
    image3?: _Image_liquid;
    /** Input type: image_picker */
    image4?: _Image_liquid;
    /** Input type: image_picker */
    image5?: _Image_liquid;
    /** Input type: image_picker */
    image6?: _Image_liquid;
    /** Input type: text */
    title1?: string;
    /** Input type: text */
    title2?: string;
    /** Input type: text */
    title3?: string;
    /** Input type: text */
    title4?: string;
    /** Input type: text */
    title5?: string;
    /** Input type: text */
    title6?: string;
  };
  type: "image-gallery";
};

export type ImageTextSection = {
  id: string;
  settings: {
    /** Input type: select */
    aspect_desktop: "auto" | "9-16" | "1-1" | "4-3" | "3-2" | "16-9" | "21-9";
    /** Input type: select */
    aspect_mobile: "hidden" | "9-16" | "1-1" | "4-3" | "3-2" | "16-9" | "21-9";
    /** Input type: checkbox */
    fit_height: boolean;
    /** Input type: radio */
    position: "left" | "right";
    /** Input type: image_picker */
    image?: _Image_liquid;
    /** Input type: richtext */
    list?: `<p${string}</p>`;
    /** Input type: text */
    list_title?: string;
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: text */
    title?: string;
  };
  type: "image-text";
};

export type InfoCardsSection = {
  blocks: InfoCardsBlocks[];
  id: string;
  settings: {
    /** Input type: product_list */
    content_list?: _Product_liquid[];
    /** Input type: text */
    pre_title?: string;
    /** Input type: text */
    title?: string;
  };
  type: "info-cards";
};

export type InfoCardsBlocks = {
  id: string;
  settings: {
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: textarea */
    svg?: string;
    /** Input type: text */
    title?: string;
  };
  type: "manual-info-card";
};

export type LogoBannerSection = {
  blocks: LogoBannerBlocks[];
  id: string;
  settings: {
    /** Input type: checkbox */
    animate: boolean;
    /** Input type: range */
    animation_duration: number;
    /** Input type: range */
    height: number;
    /** Input type: collection */
    collection?: _Collection_liquid;
    /** Input type: product_list */
    products?: _Product_liquid[];
    /** Input type: text */
    title?: string;
  };
  type: "logo-banner";
};

export type LogoBannerBlocks =
  | {
      id: string;
      settings: {
        /** Input type: textarea */
        svg?: string;
        /** Input type: text */
        title?: string;
      };
      type: "manual-svg";
    }
  | {
      id: string;
      settings: {
        /** Input type: image_picker */
        image?: _Image_liquid;
        /** Input type: text */
        title?: string;
      };
      type: "manual-image";
    };

export type PageSettingsSection = {
  id: string;
  settings: {
    /** Input type: color */
    color_accent?: _Color_liquid;
    /** Input type: color */
    color_accent_contrast?: _Color_liquid;
    /** Input type: color */
    color_accent_contrast_dark?: _Color_liquid;
    /** Input type: color */
    color_accent_dark?: _Color_liquid;
    /** Input type: color */
    color_accent_secondary?: _Color_liquid;
    /** Input type: color */
    color_accent_secondary_contrast?: _Color_liquid;
    /** Input type: color */
    color_accent_secondary_contrast_dark?: _Color_liquid;
    /** Input type: color */
    color_accent_secondary_dark?: _Color_liquid;
  };
  type: "page-settings";
};

export type SpecListSection = {
  blocks: SpecListBlocks[];
  id: string;
  settings: {
    /** Input type: checkbox */
    blur_bg: boolean;
    /** Input type: radio */
    color_toggle: "dark" | "light";
    /** Input type: color_background */
    color_bg?: string;
  };
  type: "spec-list";
};

export type SpecListBlocks =
  | {
      id: string;
      settings: {
        /** Input type: select */
        position: "left" | "center" | "right";
        /** Input type: text */
        cta1?: string;
        /** Input type: url */
        cta1_link?: string;
        /** Input type: text */
        cta2?: string;
        /** Input type: url */
        cta2_link?: string;
        /** Input type: richtext */
        paragraph?: `<p${string}</p>`;
        /** Input type: text */
        pre_title?: string;
        /** Input type: text */
        title?: string;
      };
      type: "heading";
    }
  | {
      id: string;
      settings: {
        /** Input type: select */
        icon1:
          | "BadgeCheckIcon"
          | "CameraIcon"
          | "ChatAlt2Icon"
          | "ColorSwatchIcon"
          | "CloudIcon"
          | "DesktopComputerIcon"
          | "CubeTransparentIcon"
          | "DeviceMobileIcon"
          | "DeviceTabletIcon"
          | "CursorClickIcon"
          | "HeartIcon"
          | "KeyIcon"
          | "LightningBoltIcon"
          | "LinkIcon"
          | "LightBulbIcon"
          | "LockClosedIcon"
          | "LockOpenIcon"
          | "PaperAirplaneIcon"
          | "ShoppingBagIcon"
          | "ShoppingCartIcon"
          | "SparklesIcon"
          | "TagIcon"
          | "TruckIcon"
          | "UserGroupIcon"
          | "AnnotationIcon"
          | "MailIcon"
          | "MailOpenIcon"
          | "brutalist"
          | "colors"
          | "elegant"
          | "filters"
          | "grid"
          | "playful"
          | "shadows"
          | "simple"
          | "sizing"
          | "transforms"
          | "typography"
          | "ui-avatar"
          | "ui-code"
          | "ui-cursor"
          | "ui-mobile"
          | "ui-responsive"
          | "ui-stack"
          | "ui-1"
          | "ui-2"
          | "ui-3"
          | "ui-4"
          | "CalendarLight"
          | "ChatLight"
          | "Code"
          | "DeliveryLight"
          | "ExchangeSimple"
          | "FastCheckoutLight"
          | "GiftCardLight"
          | "PlanetLight"
          | "Resize"
          | "ReturnsLight"
          | "ShippingSimple"
          | "Stack"
          | "WarrantyLight"
          | "WarrantySimple"
          | "server-2"
          | "server-8"
          | "up-align-1-light"
          | "columns-1-light"
          | "laptop-star-light"
          | "squares-1-light"
          | "cubes-light";
        /** Input type: select */
        icon2:
          | "BadgeCheckIcon"
          | "CameraIcon"
          | "ChatAlt2Icon"
          | "ColorSwatchIcon"
          | "CloudIcon"
          | "DesktopComputerIcon"
          | "CubeTransparentIcon"
          | "DeviceMobileIcon"
          | "DeviceTabletIcon"
          | "CursorClickIcon"
          | "HeartIcon"
          | "KeyIcon"
          | "LightningBoltIcon"
          | "LinkIcon"
          | "LightBulbIcon"
          | "LockClosedIcon"
          | "LockOpenIcon"
          | "PaperAirplaneIcon"
          | "ShoppingBagIcon"
          | "ShoppingCartIcon"
          | "SparklesIcon"
          | "TagIcon"
          | "TruckIcon"
          | "UserGroupIcon"
          | "AnnotationIcon"
          | "MailIcon"
          | "MailOpenIcon"
          | "brutalist"
          | "colors"
          | "elegant"
          | "filters"
          | "grid"
          | "playful"
          | "shadows"
          | "simple"
          | "sizing"
          | "transforms"
          | "typography"
          | "ui-avatar"
          | "ui-code"
          | "ui-cursor"
          | "ui-mobile"
          | "ui-responsive"
          | "ui-stack"
          | "ui-1"
          | "ui-2"
          | "ui-3"
          | "ui-4"
          | "CalendarLight"
          | "ChatLight"
          | "Code"
          | "DeliveryLight"
          | "ExchangeSimple"
          | "FastCheckoutLight"
          | "GiftCardLight"
          | "PlanetLight"
          | "Resize"
          | "ReturnsLight"
          | "ShippingSimple"
          | "Stack"
          | "WarrantyLight"
          | "WarrantySimple"
          | "server-2"
          | "server-8"
          | "up-align-1-light"
          | "columns-1-light"
          | "laptop-star-light"
          | "squares-1-light"
          | "cubes-light";
        /** Input type: select */
        icon3:
          | "BadgeCheckIcon"
          | "CameraIcon"
          | "ChatAlt2Icon"
          | "ColorSwatchIcon"
          | "CloudIcon"
          | "DesktopComputerIcon"
          | "CubeTransparentIcon"
          | "DeviceMobileIcon"
          | "DeviceTabletIcon"
          | "CursorClickIcon"
          | "HeartIcon"
          | "KeyIcon"
          | "LightningBoltIcon"
          | "LinkIcon"
          | "LightBulbIcon"
          | "LockClosedIcon"
          | "LockOpenIcon"
          | "PaperAirplaneIcon"
          | "ShoppingBagIcon"
          | "ShoppingCartIcon"
          | "SparklesIcon"
          | "TagIcon"
          | "TruckIcon"
          | "UserGroupIcon"
          | "AnnotationIcon"
          | "MailIcon"
          | "MailOpenIcon"
          | "brutalist"
          | "colors"
          | "elegant"
          | "filters"
          | "grid"
          | "playful"
          | "shadows"
          | "simple"
          | "sizing"
          | "transforms"
          | "typography"
          | "ui-avatar"
          | "ui-code"
          | "ui-cursor"
          | "ui-mobile"
          | "ui-responsive"
          | "ui-stack"
          | "ui-1"
          | "ui-2"
          | "ui-3"
          | "ui-4"
          | "CalendarLight"
          | "ChatLight"
          | "Code"
          | "DeliveryLight"
          | "ExchangeSimple"
          | "FastCheckoutLight"
          | "GiftCardLight"
          | "PlanetLight"
          | "Resize"
          | "ReturnsLight"
          | "ShippingSimple"
          | "Stack"
          | "WarrantyLight"
          | "WarrantySimple"
          | "server-2"
          | "server-8"
          | "up-align-1-light"
          | "columns-1-light"
          | "laptop-star-light"
          | "squares-1-light"
          | "cubes-light";
        /** Input type: select */
        icon4:
          | "BadgeCheckIcon"
          | "CameraIcon"
          | "ChatAlt2Icon"
          | "ColorSwatchIcon"
          | "CloudIcon"
          | "DesktopComputerIcon"
          | "CubeTransparentIcon"
          | "DeviceMobileIcon"
          | "DeviceTabletIcon"
          | "CursorClickIcon"
          | "HeartIcon"
          | "KeyIcon"
          | "LightningBoltIcon"
          | "LinkIcon"
          | "LightBulbIcon"
          | "LockClosedIcon"
          | "LockOpenIcon"
          | "PaperAirplaneIcon"
          | "ShoppingBagIcon"
          | "ShoppingCartIcon"
          | "SparklesIcon"
          | "TagIcon"
          | "TruckIcon"
          | "UserGroupIcon"
          | "AnnotationIcon"
          | "MailIcon"
          | "MailOpenIcon"
          | "brutalist"
          | "colors"
          | "elegant"
          | "filters"
          | "grid"
          | "playful"
          | "shadows"
          | "simple"
          | "sizing"
          | "transforms"
          | "typography"
          | "ui-avatar"
          | "ui-code"
          | "ui-cursor"
          | "ui-mobile"
          | "ui-responsive"
          | "ui-stack"
          | "ui-1"
          | "ui-2"
          | "ui-3"
          | "ui-4"
          | "CalendarLight"
          | "ChatLight"
          | "Code"
          | "DeliveryLight"
          | "ExchangeSimple"
          | "FastCheckoutLight"
          | "GiftCardLight"
          | "PlanetLight"
          | "Resize"
          | "ReturnsLight"
          | "ShippingSimple"
          | "Stack"
          | "WarrantyLight"
          | "WarrantySimple"
          | "server-2"
          | "server-8"
          | "up-align-1-light"
          | "columns-1-light"
          | "laptop-star-light"
          | "squares-1-light"
          | "cubes-light";
        /** Input type: select */
        icon5:
          | "BadgeCheckIcon"
          | "CameraIcon"
          | "ChatAlt2Icon"
          | "ColorSwatchIcon"
          | "CloudIcon"
          | "DesktopComputerIcon"
          | "CubeTransparentIcon"
          | "DeviceMobileIcon"
          | "DeviceTabletIcon"
          | "CursorClickIcon"
          | "HeartIcon"
          | "KeyIcon"
          | "LightningBoltIcon"
          | "LinkIcon"
          | "LightBulbIcon"
          | "LockClosedIcon"
          | "LockOpenIcon"
          | "PaperAirplaneIcon"
          | "ShoppingBagIcon"
          | "ShoppingCartIcon"
          | "SparklesIcon"
          | "TagIcon"
          | "TruckIcon"
          | "UserGroupIcon"
          | "AnnotationIcon"
          | "MailIcon"
          | "MailOpenIcon"
          | "brutalist"
          | "colors"
          | "elegant"
          | "filters"
          | "grid"
          | "playful"
          | "shadows"
          | "simple"
          | "sizing"
          | "transforms"
          | "typography"
          | "ui-avatar"
          | "ui-code"
          | "ui-cursor"
          | "ui-mobile"
          | "ui-responsive"
          | "ui-stack"
          | "ui-1"
          | "ui-2"
          | "ui-3"
          | "ui-4"
          | "CalendarLight"
          | "ChatLight"
          | "Code"
          | "DeliveryLight"
          | "ExchangeSimple"
          | "FastCheckoutLight"
          | "GiftCardLight"
          | "PlanetLight"
          | "Resize"
          | "ReturnsLight"
          | "ShippingSimple"
          | "Stack"
          | "WarrantyLight"
          | "WarrantySimple"
          | "server-2"
          | "server-8"
          | "up-align-1-light"
          | "columns-1-light"
          | "laptop-star-light"
          | "squares-1-light"
          | "cubes-light";
        /** Input type: select */
        icon6:
          | "BadgeCheckIcon"
          | "CameraIcon"
          | "ChatAlt2Icon"
          | "ColorSwatchIcon"
          | "CloudIcon"
          | "DesktopComputerIcon"
          | "CubeTransparentIcon"
          | "DeviceMobileIcon"
          | "DeviceTabletIcon"
          | "CursorClickIcon"
          | "HeartIcon"
          | "KeyIcon"
          | "LightningBoltIcon"
          | "LinkIcon"
          | "LightBulbIcon"
          | "LockClosedIcon"
          | "LockOpenIcon"
          | "PaperAirplaneIcon"
          | "ShoppingBagIcon"
          | "ShoppingCartIcon"
          | "SparklesIcon"
          | "TagIcon"
          | "TruckIcon"
          | "UserGroupIcon"
          | "AnnotationIcon"
          | "MailIcon"
          | "MailOpenIcon"
          | "brutalist"
          | "colors"
          | "elegant"
          | "filters"
          | "grid"
          | "playful"
          | "shadows"
          | "simple"
          | "sizing"
          | "transforms"
          | "typography"
          | "ui-avatar"
          | "ui-code"
          | "ui-cursor"
          | "ui-mobile"
          | "ui-responsive"
          | "ui-stack"
          | "ui-1"
          | "ui-2"
          | "ui-3"
          | "ui-4"
          | "CalendarLight"
          | "ChatLight"
          | "Code"
          | "DeliveryLight"
          | "ExchangeSimple"
          | "FastCheckoutLight"
          | "GiftCardLight"
          | "PlanetLight"
          | "Resize"
          | "ReturnsLight"
          | "ShippingSimple"
          | "Stack"
          | "WarrantyLight"
          | "WarrantySimple"
          | "server-2"
          | "server-8"
          | "up-align-1-light"
          | "columns-1-light"
          | "laptop-star-light"
          | "squares-1-light"
          | "cubes-light";
        /** Input type: text */
        text1?: string;
        /** Input type: text */
        text2?: string;
        /** Input type: text */
        text3?: string;
        /** Input type: text */
        text4?: string;
        /** Input type: text */
        text5?: string;
        /** Input type: text */
        text6?: string;
      };
      type: "list";
    };

export type StatsGraphSection = {
  blocks: StatsGraphBlocks[];
  id: string;
  type: "stats-graph";
};

export type StatsGraphBlocks = {
  id: string;
  settings: {
    /** Input type: text */
    descriptions?: string;
    /** Input type: text */
    stat?: string;
  };
  type: "stat";
};

export type StorySection = {
  blocks: StoryBlocks[];
  id: string;
  type: "story";
};

export type StoryBlocks =
  | {
      id: string;
      settings: {
        /** Input type: select */
        position: "left" | "center" | "right";
        /** Input type: text */
        cta1?: string;
        /** Input type: url */
        cta1_link?: string;
        /** Input type: text */
        cta2?: string;
        /** Input type: url */
        cta2_link?: string;
        /** Input type: richtext */
        paragraph?: `<p${string}</p>`;
        /** Input type: text */
        pre_title?: string;
        /** Input type: text */
        title?: string;
      };
      type: "heading";
    }
  | {
      id: string;
      settings: {
        /** Input type: select */
        aspect_desktop: "auto" | "9-16" | "1-1" | "4-3" | "3-2" | "16-9" | "21-9";
        /** Input type: select */
        aspect_mobile: "hidden" | "9-16" | "1-1" | "4-3" | "3-2" | "16-9" | "21-9";
        /** Input type: checkbox */
        fit_height: boolean;
        /** Input type: radio */
        position: "left" | "right";
        /** Input type: image_picker */
        image?: _Image_liquid;
        /** Input type: richtext */
        list?: `<p${string}</p>`;
        /** Input type: text */
        list_title?: string;
        /** Input type: richtext */
        paragraph?: `<p${string}</p>`;
        /** Input type: text */
        pre_title?: string;
        /** Input type: text */
        title?: string;
      };
      type: "image-text";
    };

export type TabsFaqSection = {
  blocks: TabsFaqBlocks[];
  id: string;
  settings: {
    /** Input type: text */
    title?: string;
  };
  type: "tabs-faq";
};

export type TabsFaqBlocks = {
  id: string;
  settings: {
    /** Input type: collection */
    faq_items?: _Collection_liquid;
    /** Input type: text */
    title?: string;
  };
  type: "category";
};

export type TabsImageCardSection = {
  blocks: TabsImageCardBlocks[];
  id: string;
  type: "tabs-image-card";
};

export type TabsImageCardBlocks =
  | {
      id: string;
      settings: {
        /** Input type: select */
        position: "left" | "center" | "right";
        /** Input type: text */
        cta1?: string;
        /** Input type: url */
        cta1_link?: string;
        /** Input type: text */
        cta2?: string;
        /** Input type: url */
        cta2_link?: string;
        /** Input type: richtext */
        paragraph?: `<p${string}</p>`;
        /** Input type: text */
        pre_title?: string;
        /** Input type: text */
        title?: string;
      };
      type: "heading";
    }
  | {
      id: string;
      settings: {
        /** Input type: select */
        tab_icon:
          | "BadgeCheckIcon"
          | "CameraIcon"
          | "ChatAlt2Icon"
          | "ColorSwatchIcon"
          | "CloudIcon"
          | "DesktopComputerIcon"
          | "CubeTransparentIcon"
          | "DeviceMobileIcon"
          | "DeviceTabletIcon"
          | "CursorClickIcon"
          | "HeartIcon"
          | "KeyIcon"
          | "LightningBoltIcon"
          | "LinkIcon"
          | "LightBulbIcon"
          | "LockClosedIcon"
          | "LockOpenIcon"
          | "PaperAirplaneIcon"
          | "ShoppingBagIcon"
          | "ShoppingCartIcon"
          | "SparklesIcon"
          | "TagIcon"
          | "TruckIcon"
          | "UserGroupIcon"
          | "AnnotationIcon"
          | "MailIcon"
          | "MailOpenIcon"
          | "brutalist"
          | "colors"
          | "elegant"
          | "filters"
          | "grid"
          | "playful"
          | "shadows"
          | "simple"
          | "sizing"
          | "transforms"
          | "typography"
          | "ui-avatar"
          | "ui-code"
          | "ui-cursor"
          | "ui-mobile"
          | "ui-responsive"
          | "ui-stack"
          | "ui-1"
          | "ui-2"
          | "ui-3"
          | "ui-4"
          | "CalendarLight"
          | "ChatLight"
          | "Code"
          | "DeliveryLight"
          | "ExchangeSimple"
          | "FastCheckoutLight"
          | "GiftCardLight"
          | "PlanetLight"
          | "Resize"
          | "ReturnsLight"
          | "ShippingSimple"
          | "Stack"
          | "WarrantyLight"
          | "WarrantySimple"
          | "server-2"
          | "server-8"
          | "up-align-1-light"
          | "columns-1-light"
          | "laptop-star-light"
          | "squares-1-light"
          | "cubes-light";
        /** Input type: text */
        cta1?: string;
        /** Input type: url */
        cta1_link?: string;
        /** Input type: text */
        cta2?: string;
        /** Input type: url */
        cta2_link?: string;
        /** Input type: image_picker */
        image?: _Image_liquid;
        /** Input type: url */
        image_link?: string;
        /** Input type: richtext */
        paragraph?: `<p${string}</p>`;
        /** Input type: text */
        tab_title?: string;
        /** Input type: text */
        title?: string;
      };
      type: "tab";
    };

export type TabsProcessStepSection = {
  blocks: TabsProcessStepBlocks[];
  id: string;
  settings: {
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: text */
    title?: string;
  };
  type: "tabs-process-step";
};

export type TabsProcessStepBlocks = {
  id: string;
  settings: {
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: textarea */
    tab_paragraph?: string;
    /** Input type: text */
    tab_title?: string;
    /** Input type: text */
    title?: string;
  };
  type: "step";
};

export type TeamListSection = {
  blocks: TeamListBlocks[];
  id: string;
  type: "team-list";
};

export type TeamListBlocks =
  | {
      id: string;
      settings: {
        /** Input type: select */
        position: "left" | "center" | "right";
        /** Input type: text */
        cta1?: string;
        /** Input type: url */
        cta1_link?: string;
        /** Input type: text */
        cta2?: string;
        /** Input type: url */
        cta2_link?: string;
        /** Input type: richtext */
        paragraph?: `<p${string}</p>`;
        /** Input type: text */
        pre_title?: string;
        /** Input type: text */
        title?: string;
      };
      type: "heading";
    }
  | {
      id: string;
      settings: {
        /** Input type: image_picker */
        image?: _Image_liquid;
        /** Input type: text */
        job_title?: string;
        /** Input type: text */
        name?: string;
      };
      type: "team_member";
    };

export type TemplateArticleSection = {
  id: string;
  type: "template-article";
};

export type TemplateBlogSection = {
  id: string;
  type: "template-blog";
};

export type TemplateCartSection = {
  id: string;
  type: "template-cart";
};

export type TemplateCollectionSection = {
  id: string;
  type: "template-collection";
};

export type TemplateListCollectionsSection = {
  id: string;
  type: "template-list-collections";
};

export type TemplatePageSection = {
  id: string;
  type: "template-page";
};

export type TemplatePasswordSection = {
  id: string;
  type: "template-password";
};

export type TemplateProductSection = {
  id: string;
  type: "template-product";
};

export type TemplateSearchSection = {
  id: string;
  type: "template-search";
};

export type Template_404Section = {
  id: string;
  type: "template-404";
};

export type TestSection = {
  id: string;
  settings: {
    /** Input type: font_picker */
    font: _Font_liquid;
    /** Input type: article */
    article?: _Article_liquid;
    /** Input type: blog */
    blog?: _Blog_liquid;
    /** Input type: collection */
    collection?: _Collection_liquid;
    /** Input type: collection_list */
    collection_list?: _Collection_liquid[];
    /** Input type: color */
    color?: _Color_liquid;
    /** Input type: font */
    font2?: string;
    /** Input type: image_picker */
    image?: _Image_liquid;
    /** Input type: link_list */
    links?: _Linklist_liquid;
    /** Input type: page */
    page?: _Page_liquid;
    /** Input type: product */
    product?: _Product_liquid;
    /** Input type: product_list */
    product_list?: _Product_liquid[];
  };
  type: "test";
};

export type TestimonialListSection = {
  blocks: TestimonialListBlocks[];
  id: string;
  settings: {
    /** Input type: select */
    position: "left" | "center" | "right";
    /** Input type: text */
    cta1?: string;
    /** Input type: url */
    cta1_link?: string;
    /** Input type: text */
    cta2?: string;
    /** Input type: url */
    cta2_link?: string;
    /** Input type: richtext */
    paragraph?: `<p${string}</p>`;
    /** Input type: text */
    pre_title?: string;
    /** Input type: product_list */
    products?: _Product_liquid[];
    /** Input type: text */
    title?: string;
  };
  type: "testimonial-list";
};

export type TestimonialListBlocks = {
  id: string;
  settings: {
    /** Input type: text */
    author?: string;
    /** Input type: image_picker */
    image?: _Image_liquid;
    /** Input type: text */
    job_title?: string;
    /** Input type: url */
    link?: string;
    /** Input type: richtext */
    quote?: `<p${string}</p>`;
  };
  type: "testimonial";
};

export type Sections =
  | BackgroundSection
  | BlockquoteSection
  | ContactSection
  | FeatureCarouselSection
  | FeatureListSection
  | FooterSection
  | HeaderSection
  | HeadingSection
  | HeroWithFeaturesSection
  | HeroSection
  | ImageCarouselSection
  | ImageGallerySection
  | ImageTextSection
  | InfoCardsSection
  | LogoBannerSection
  | PageSettingsSection
  | SpecListSection
  | StatsGraphSection
  | StorySection
  | TabsFaqSection
  | TabsImageCardSection
  | TabsProcessStepSection
  | TeamListSection
  | TemplateArticleSection
  | TemplateBlogSection
  | TemplateCartSection
  | TemplateCollectionSection
  | TemplateListCollectionsSection
  | TemplatePageSection
  | TemplatePasswordSection
  | TemplateProductSection
  | TemplateSearchSection
  | Template_404Section
  | TestSection
  | TestimonialListSection;
