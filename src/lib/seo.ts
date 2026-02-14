import { routing, type Locale } from "@/i18n/routing";

/* ─── Site-wide constants ─── */
export const SITE_URL = "https://www.placy.ai";
export const SITE_NAME = "Placy Pro";
export const TWITTER_HANDLE = "@Placy_ai";

/* OG locale mapping (BCP 47 → Open Graph format) */
const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  el: "el_GR",
  es: "es_ES",
  ar: "ar_AE",
};

/**
 * Build the full URL for a given locale and pathname.
 * With localePrefix: "as-needed", the default locale has no prefix:
 *   en → https://www.placy.ai/
 *   el → https://www.placy.ai/el
 *   es → https://www.placy.ai/es
 *   ar → https://www.placy.ai/ar
 */
export function getLocalizedUrl(locale: Locale, pathname: string = "/"): string {
  const isDefault = locale === routing.defaultLocale;
  const path = pathname === "/" ? "" : pathname;

  if (isDefault) {
    // Default locale: no prefix → https://www.placy.ai/ or https://www.placy.ai/about
    return `${SITE_URL}${path || "/"}`;
  }

  // Non-default locale: prefix → https://www.placy.ai/el or https://www.placy.ai/el/about
  return `${SITE_URL}/${locale}${path}`;
}

/**
 * Generate hreflang alternate links for all locales.
 * Includes x-default pointing to the default locale (no prefix).
 */
export function getAlternates(pathname: string = "/") {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = getLocalizedUrl(locale as Locale, pathname);
  }
  languages["x-default"] = getLocalizedUrl(
    routing.defaultLocale as Locale,
    pathname
  );

  return {
    canonical: undefined as string | undefined, // set per-page
    languages,
  };
}

/**
 * Get OG locale string.
 */
export function getOgLocale(locale: Locale): string {
  return OG_LOCALE_MAP[locale] ?? "en_US";
}

/**
 * Get all alternate OG locales (excluding current).
 */
export function getOgLocaleAlternates(currentLocale: Locale): string[] {
  return routing.locales
    .filter((l) => l !== currentLocale)
    .map((l) => OG_LOCALE_MAP[l as Locale]);
}
