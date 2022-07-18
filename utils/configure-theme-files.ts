import { Config } from "./init-config";

export const configureThemeFiles = (content: string, config: Config) => {
  return content
    .replace(
      /\|\|\|GLOBAL_SECTIONS_ABOVE_LAYOUT\|\|\|/g,
      config.global_header_sections.map((section) => `{% section '${section}'%}`).join("\n  ")
    )
    .replace(
      /\|\|\|GLOBAL_SECTIONS_BELOW_LAYOUT\|\|\|/g,
      config.global_footer_sections.map((section) => `{% section '${section}'%}`).join("\n  ")
    )
    .replace(/\|\|\|DEVELOPMENT_URL\|\|\|/g, config.development_server)
    .replace(/\|\|\|DEPLOYMENT_URL\|\|\|/g, config.deployment_server);
};
