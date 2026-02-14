import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root page — redirects to the default locale.
 * With localePrefix: "always", every locale has an explicit prefix.
 * This 307 redirect sends `/` → `/en`.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
