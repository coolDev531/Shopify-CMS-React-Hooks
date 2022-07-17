import { _Color_liquid, _Font_liquid, _Image_liquid } from "types/shopify";

export type SettingsSchema = {
  /** Input type: font_picker */
  font_heading: _Font_liquid;
  /** Input type: font_picker */
  font_text: _Font_liquid;
  /** Input type: select */
  grayscale: "gray" | "slate" | "zinc" | "neutral" | "stone" | "bluegray" | "coolgray";
  /** Input type: range */
  spacing_section: number;
  /** Input type: range */
  spacing_section_mobile: number;
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
  /** Input type: color */
  color_bg?: _Color_liquid;
  /** Input type: color */
  color_bg_card?: _Color_liquid;
  /** Input type: color */
  color_bg_card_dark?: _Color_liquid;
  /** Input type: color */
  color_bg_dark?: _Color_liquid;
  /** Input type: color */
  color_bg_secondary?: _Color_liquid;
  /** Input type: color */
  color_bg_secondary_dark?: _Color_liquid;
  /** Input type: color */
  color_danger?: _Color_liquid;
  /** Input type: color */
  color_info?: _Color_liquid;
  /** Input type: color */
  color_success?: _Color_liquid;
  /** Input type: color */
  color_warning?: _Color_liquid;
  /** Input type: image_picker */
  favicon?: _Image_liquid;
  /** Input type: text */
  social_facebook?: string;
  /** Input type: text */
  social_github?: string;
  /** Input type: text */
  social_instagram?: string;
  /** Input type: text */
  social_twitter?: string;
};
