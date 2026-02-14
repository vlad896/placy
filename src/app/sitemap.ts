import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL, getLocalizedUrl } from "@/lib/seo";

/**
 * Dynamic sitemap with hreflang annotations for all locale variants.
 * Each URL includes alternates for every supported locale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* All pages that exist in the app */
  const pages = [
    { pathname: "/", priority: 1.0, changeFrequency: "weekly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of routing.locales) {
      /* Build alternates map: locale → full URL */
      const alternates: Record<string, string> = {};
      for (const alt of routing.locales) {
        alternates[alt] = getLocalizedUrl(alt as Locale, page.pathname);
      }
      alternates["x-default"] = getLocalizedUrl(
        routing.defaultLocale as Locale,
        page.pathname
      );

      entries.push({
        url: getLocalizedUrl(locale as Locale, page.pathname),
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
