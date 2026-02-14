"use client";

import { useEffect } from "react";

/**
 * Client component that sets lang and dir on the <html> element.
 * This is needed because the root layout renders <html> statically,
 * and the [locale] layout needs to update these attributes dynamically.
 */
export function HtmlAttrs({
  locale,
  dir,
}: {
  locale: string;
  dir: "ltr" | "rtl";
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return null;
}
