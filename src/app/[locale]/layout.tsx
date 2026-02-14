import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { HtmlAttrs } from "@/components/HtmlAttrs";
import {
  SITE_URL,
  SITE_NAME,
  TWITTER_HANDLE,
  getLocalizedUrl,
  getAlternates,
  getOgLocale,
  getOgLocaleAlternates,
} from "@/lib/seo";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const RTL_LOCALES: Locale[] = ["ar"];

/* ════════════════════════════════════════
   SEO: generateMetadata
   ════════════════════════════════════════ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("title");
  const description = t("description");
  const canonicalUrl = getLocalizedUrl(loc);
  const alternates = getAlternates();
  alternates.canonical = canonicalUrl;

  return {
    /* ── Core ── */
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,

    /* ── Canonical + hreflang ── */
    alternates,

    /* ── Open Graph ── */
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonicalUrl,
      locale: getOgLocale(loc),
      alternateLocale: getOgLocaleAlternates(loc),
      images: [
        {
          url: `${SITE_URL}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },

    /* ── Twitter Card ── */
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [`${SITE_URL}/images/og-image.png`],
    },

    /* ── Additional SEO ── */
    metadataBase: new URL(SITE_URL),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "google": "notranslate", // prevent auto-translation (we handle it)
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ════════════════════════════════════════
   Layout
   ════════════════════════════════════════ */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = RTL_LOCALES.includes(locale as Locale);

  /* JSON-LD: Organization + WebSite structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo-black.svg`,
          width: 110,
          height: 44,
        },
        sameAs: [
          "https://www.linkedin.com/company/placy-ai/",
          "https://x.com/Placy_ai",
          "https://www.facebook.com/placyai/",
          "https://www.instagram.com/placy.ai/",
          "https://www.youtube.com/@placyai",
          "https://www.tiktok.com/@placy",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: routing.locales,
      },
      {
        "@type": "WebPage",
        "@id": `${getLocalizedUrl(locale as Locale)}#webpage`,
        url: getLocalizedUrl(locale as Locale),
        name: SITE_NAME,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: locale,
      },
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlAttrs locale={locale} dir={isRTL ? "rtl" : "ltr"} />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <main id="main-content">{children}</main>
    </NextIntlClientProvider>
  );
}
