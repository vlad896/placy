"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════
   Navigation data — hrefs are locale-independent,
   labels come from translations
   ═══════════════════════════════════════════════════════ */

interface DropdownLink {
  key: string; // translation key
  href: string;
  soon?: boolean;
}

interface DropdownSection {
  titleKey: string;
  links: DropdownLink[];
}

interface SimpleDropdown {
  id: string;
  labelKey: string;
  type: "simple";
  links: DropdownLink[];
}

interface SectionedDropdown {
  id: string;
  labelKey: string;
  type: "sectioned";
  sections: DropdownSection[];
}

type NavDropdown = SimpleDropdown | SectionedDropdown;

const NAV_DROPDOWNS: NavDropdown[] = [
  {
    id: "products",
    labelKey: "products",
    type: "simple",
    links: [
      { key: "leadEngagement", href: "/modules/lead-engagement" },
      { key: "agentCopilot", href: "#", soon: true },
      { key: "leadGeneration", href: "#", soon: true },
      { key: "analyticsDashboard", href: "#", soon: true },
      { key: "smartOutreach", href: "#", soon: true },
      { key: "propertyManagement", href: "#", soon: true },
    ],
  },
  {
    id: "features",
    labelKey: "features",
    type: "simple",
    links: [
      { key: "analyzePerformance", href: "/feature/analyze-performance" },
      { key: "customizeAssistant", href: "/feature/customize-the-assistant" },
      { key: "askAnswer", href: "/feature/ask-answer-questions" },
      { key: "chatWhatsApp", href: "/feature/chat-on-whatsapp" },
      { key: "scoreQualify", href: "/feature/score-qualify-leads" },
      { key: "replyAnytime", href: "/feature/reply-anytime" },
      { key: "receivePhoneCalls", href: "/feature/receive-phone-calls" },
      { key: "greetLeads", href: "/feature/greet-incoming-leads" },
      { key: "connectCRM", href: "/feature/connect-crm" },
      { key: "speakLanguages", href: "/feature/speak-multiple-languages" },
    ],
  },
  {
    id: "resources",
    labelKey: "resources",
    type: "sectioned",
    sections: [
      {
        titleKey: "learnMore",
        links: [
          { key: "aboutUs", href: "/about-us" },
          { key: "blog", href: "/blogs" },
          { key: "media", href: "/media" },
        ],
      },
      {
        titleKey: "getHelp",
        links: [{ key: "talkToSales", href: "/pages/talk-to-sales" }],
      },
    ],
  },
];

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  el: "Ελλάδα",
  es: "Español",
  ar: "العربية",
};

/* ═══════════════════════════════════════════════════════
   Navbar Component
   ═══════════════════════════════════════════════════════ */

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleDropdown = useCallback((id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }, []);

  const toggleMobileAccordion = useCallback((id: string) => {
    setMobileAccordion((prev) => (prev === id ? null : id));
  }, []);

  const closeAll = useCallback(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      router.replace(pathname, { locale: newLocale });
      closeAll();
    },
    [router, pathname, closeAll]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeAll]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 inset-x-0 z-[999]",
        "transition-[background-color,box-shadow] duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "h-16 md:h-20 lg:h-24",
          "px-4 md:px-6"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          onClick={closeAll}
          className="relative shrink-0 z-10"
        >
          <Image
            src="/images/logo-black.svg"
            alt="Placy logo"
            width={110}
            height={44}
            priority
            className="h-8 w-auto md:h-9 lg:h-11"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-0.5"
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_DROPDOWNS.map((dropdown) => (
            <DesktopDropdown
              key={dropdown.id}
              dropdown={dropdown}
              t={t}
              isOpen={activeDropdown === dropdown.id}
              onToggle={() => toggleDropdown(dropdown.id)}
              onNavigate={closeAll}
            />
          ))}

          <DesktopLocaleSwitcher
            currentLocale={locale}
            isOpen={activeDropdown === "locale"}
            onToggle={() => toggleDropdown("locale")}
            onSwitch={switchLocale}
          />
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 z-10">
          <Link
            href="/pages/placy-pro-ai-demo-listing"
            className={cn(
              "flex items-center justify-center",
              "h-10 px-5",
              "text-sm font-medium tracking-tight-3 text-white",
              "bg-black rounded-full",
              "transition-colors duration-200 hover:bg-black/85"
            )}
          >
            {t("tryPlacy")}
          </Link>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="relative flex lg:hidden flex-col justify-center items-center w-10 h-10 gap-[5px]"
          >
            <span
              className={cn(
                "block h-[2px] w-5 bg-black rounded-full",
                "transition-all duration-300 origin-center",
                mobileOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-5 bg-black rounded-full",
                "transition-all duration-300",
                mobileOpen && "opacity-0 scale-x-0"
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-5 bg-black rounded-full",
                "transition-all duration-300 origin-center",
                mobileOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 lg:hidden",
          "top-16 md:top-20",
          "bg-white overflow-y-auto",
          "transition-all duration-300 ease-out",
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="px-5 py-4">
          {NAV_DROPDOWNS.map((dropdown) => (
            <MobileAccordion
              key={dropdown.id}
              dropdown={dropdown}
              t={t}
              isOpen={mobileAccordion === dropdown.id}
              onToggle={() => toggleMobileAccordion(dropdown.id)}
              onNavigate={closeAll}
            />
          ))}

          <MobileLocaleAccordion
            currentLocale={locale}
            t={t}
            isOpen={mobileAccordion === "locale"}
            onToggle={() => toggleMobileAccordion("locale")}
            onSwitch={switchLocale}
          />

          <div className="mt-6 pt-4 border-t border-black/5">
            <button
              onClick={closeAll}
              className={cn(
                "w-full py-3.5",
                "text-base font-medium tracking-tight-3 text-white",
                "bg-black rounded-2xl",
                "transition-colors duration-200 hover:bg-black/85"
              )}
            >
              {t("bookDemo")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════
   Desktop Dropdown
   ═══════════════════════════════════════════════════════ */

function DesktopDropdown({
  dropdown,
  t,
  isOpen,
  onToggle,
  onNavigate,
}: {
  dropdown: NavDropdown;
  t: ReturnType<typeof useTranslations>;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          "flex items-center gap-1.5",
          "px-4 py-6",
          "text-sm tracking-tight-3 text-black",
          "transition-colors duration-150 hover:text-black/60"
        )}
      >
        {t(dropdown.labelKey)}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          strokeWidth={2}
        />
      </button>

      <div
        role="menu"
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-2",
          "transition-all duration-200 origin-top",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.97] pointer-events-none"
        )}
      >
        <div
          className={cn(
            "bg-white rounded-2xl",
            "shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
            "border border-black/[0.04]",
            "overflow-hidden"
          )}
        >
          {dropdown.type === "simple" ? (
            <div className="py-2 min-w-[220px]">
              {dropdown.links.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={link.soon ? undefined : onNavigate}
                  className={cn(
                    "flex items-center gap-2",
                    "px-4 py-2.5",
                    "text-sm tracking-tight-3",
                    "transition-colors duration-150",
                    link.soon
                      ? "text-black/35 cursor-default"
                      : "text-black/80 hover:bg-black/[0.03] hover:text-black"
                  )}
                >
                  {t(link.key)}
                  {link.soon && (
                    <span className="text-[10px] font-medium text-black/25 bg-black/[0.04] px-1.5 py-0.5 rounded-full leading-none">
                      {t("soon")}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex divide-x divide-black/[0.04]">
              {dropdown.sections.map((section) => (
                <div key={section.titleKey} className="py-3 px-1 min-w-[180px]">
                  <div className="px-3 pb-2 text-[11px] font-semibold tracking-widest text-black/30 uppercase">
                    {t(section.titleKey)}
                  </div>
                  {section.links.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={onNavigate}
                      className={cn(
                        "block px-3 py-2",
                        "text-sm tracking-tight-3 text-black/80",
                        "transition-colors duration-150",
                        "hover:bg-black/[0.03] hover:text-black",
                        "rounded-lg"
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Desktop Language Switcher
   ═══════════════════════════════════════════════════════ */

function DesktopLocaleSwitcher({
  currentLocale,
  isOpen,
  onToggle,
  onSwitch,
}: {
  currentLocale: Locale;
  isOpen: boolean;
  onToggle: () => void;
  onSwitch: (locale: Locale) => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Select language"
        className={cn(
          "flex items-center gap-1.5",
          "px-4 py-6",
          "text-black",
          "transition-colors duration-150 hover:text-black/60"
        )}
      >
        <Image
          src="/images/translate-icon.svg"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5"
          aria-hidden
        />
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          strokeWidth={2}
        />
      </button>

      <div
        role="menu"
        className={cn(
          "absolute top-full right-0 pt-2",
          "transition-all duration-200 origin-top-right",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.97] pointer-events-none"
        )}
      >
        <div
          className={cn(
            "bg-white rounded-2xl",
            "shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
            "border border-black/[0.04]",
            "overflow-hidden",
            "min-w-[160px] py-2"
          )}
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => onSwitch(loc)}
              className={cn(
                "block w-full text-start px-4 py-2.5",
                "text-sm tracking-tight-3",
                "transition-colors duration-150",
                "hover:bg-black/[0.03]",
                loc === currentLocale
                  ? "text-black font-medium"
                  : "text-black/60 hover:text-black"
              )}
            >
              {LOCALE_LABELS[loc]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Mobile Accordion
   ═══════════════════════════════════════════════════════ */

function MobileAccordion({
  dropdown,
  t,
  isOpen,
  onToggle,
  onNavigate,
}: {
  dropdown: NavDropdown;
  t: ReturnType<typeof useTranslations>;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-black/[0.06]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between",
          "py-4",
          "text-[1.125rem] font-medium tracking-tight-3 text-black"
        )}
      >
        {t(dropdown.labelKey)}
        <ChevronDown
          className={cn(
            "h-5 w-5 text-black/40 shrink-0",
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          strokeWidth={2}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-3"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          {dropdown.type === "simple" ? (
            <div className="flex flex-col gap-0.5 pl-1">
              {dropdown.links.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={link.soon ? undefined : onNavigate}
                  className={cn(
                    "flex items-center gap-2",
                    "py-2.5 px-3 rounded-xl",
                    "text-base tracking-tight-3",
                    link.soon
                      ? "text-black/30"
                      : "text-black/60 active:bg-black/[0.03]"
                  )}
                >
                  {t(link.key)}
                  {link.soon && (
                    <span className="text-[10px] font-medium text-black/20 bg-black/[0.04] px-1.5 py-0.5 rounded-full leading-none">
                      {t("soon")}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 pl-1">
              {dropdown.sections.map((section) => (
                <div key={section.titleKey}>
                  <div className="px-3 pb-1.5 text-[11px] font-semibold tracking-widest text-black/25 uppercase">
                    {t(section.titleKey)}
                  </div>
                  {section.links.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={onNavigate}
                      className="block py-2.5 px-3 rounded-xl text-base tracking-tight-3 text-black/60 active:bg-black/[0.03]"
                    >
                      {t(link.key)}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Mobile Language Accordion
   ═══════════════════════════════════════════════════════ */

function MobileLocaleAccordion({
  currentLocale,
  t,
  isOpen,
  onToggle,
  onSwitch,
}: {
  currentLocale: Locale;
  t: ReturnType<typeof useTranslations>;
  isOpen: boolean;
  onToggle: () => void;
  onSwitch: (locale: Locale) => void;
}) {
  return (
    <div className="border-b border-black/[0.06]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between",
          "py-4",
          "text-[1.125rem] font-medium tracking-tight-3 text-black"
        )}
      >
        <span className="flex items-center gap-2.5">
          <Image
            src="/images/translate-icon.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
            aria-hidden
          />
          {t("language")}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-black/40 shrink-0",
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          strokeWidth={2}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-3"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-0.5 pl-1">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => onSwitch(loc)}
                className={cn(
                  "py-2.5 px-3 rounded-xl text-start",
                  "text-base tracking-tight-3",
                  "active:bg-black/[0.03]",
                  loc === currentLocale
                    ? "text-black font-medium"
                    : "text-black/60"
                )}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
