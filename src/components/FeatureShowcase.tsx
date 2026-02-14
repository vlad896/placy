"use client";

import { type ComponentType } from "react";
import Image from "next/image";
import {
  Globe,
  MessageSquare,
  BarChart3,
  Clock,
  Phone,
  Languages,
  Database,
  CalendarCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════
   Feature card data — positions form a bento grid
   ═══════════════════════════════════════════════════════ */

interface FeatureItem {
  id: string;
  labelKey: string;
  image: string;
  alt: string;
  icon: ComponentType<{ className?: string }>;
  accent: { pill: string; text: string };
  width: number;
  height: number;
  sizes: string;
  gridClass: string;
  delay: number;
  variant: "fadeUp" | "fadeLeft" | "fadeRight";
}

const FEATURES: FeatureItem[] = [
  {
    id: "website",
    labelKey: "websiteChat",
    image: "/images/features/website.avif",
    alt: "Website chat interface",
    icon: Globe,
    accent: { pill: "bg-blue-50 ring-blue-100", text: "text-blue-600" },
    width: 600,
    height: 450,
    sizes: "(max-width: 992px) 50vw, 33vw",
    gridClass: "lg:col-start-1 lg:col-span-4 lg:row-start-1",
    delay: 0.05,
    variant: "fadeUp",
  },
  {
    id: "whatsapp",
    labelKey: "whatsapp",
    image: "/images/features/whatsapp.avif",
    alt: "WhatsApp messaging",
    icon: MessageSquare,
    accent: { pill: "bg-emerald-50 ring-emerald-100", text: "text-emerald-600" },
    width: 600,
    height: 450,
    sizes: "(max-width: 992px) 50vw, 33vw",
    gridClass: "lg:col-start-5 lg:col-span-4 lg:row-start-1",
    delay: 0.1,
    variant: "fadeUp",
  },
  {
    id: "score",
    labelKey: "scoreQualify",
    image: "/images/features/score-qualify.png",
    alt: "Score and qualify leads",
    icon: BarChart3,
    accent: { pill: "bg-violet-50 ring-violet-100", text: "text-violet-600" },
    width: 600,
    height: 450,
    sizes: "(max-width: 992px) 50vw, 33vw",
    gridClass: "lg:col-start-9 lg:col-span-4 lg:row-start-1",
    delay: 0.15,
    variant: "fadeUp",
  },
  {
    id: "reply",
    labelKey: "replyAnytime",
    image: "/images/features/reply-anytime.avif",
    alt: "24/7 automated replies",
    icon: Clock,
    accent: { pill: "bg-amber-50 ring-amber-100", text: "text-amber-600" },
    width: 600,
    height: 450,
    sizes: "(max-width: 992px) 50vw, 25vw",
    gridClass: "lg:col-start-1 lg:col-span-3 lg:row-start-2",
    delay: 0.1,
    variant: "fadeLeft",
  },
  {
    id: "languages",
    labelKey: "languages",
    image: "/images/features/languages.avif",
    alt: "Support for 50+ languages",
    icon: Languages,
    accent: { pill: "bg-cyan-50 ring-cyan-100", text: "text-cyan-600" },
    width: 600,
    height: 450,
    sizes: "(max-width: 992px) 50vw, 25vw",
    gridClass: "lg:col-start-1 lg:col-span-3 lg:row-start-3",
    delay: 0.15,
    variant: "fadeLeft",
  },
  {
    id: "qobrix",
    labelKey: "crmConnect",
    image: "/images/features/qobrix.png",
    alt: "CRM integration with Qobrix",
    icon: Database,
    accent: { pill: "bg-slate-50 ring-slate-200", text: "text-slate-600" },
    width: 400,
    height: 400,
    sizes: "(max-width: 992px) 50vw, 25vw",
    gridClass: "lg:col-start-4 lg:col-span-3 lg:row-start-4",
    delay: 0.2,
    variant: "fadeUp",
  },
  {
    id: "meeting",
    labelKey: "bookMeetings",
    image: "/images/features/meeting.png",
    alt: "Meeting booking interface",
    icon: CalendarCheck,
    accent: { pill: "bg-indigo-50 ring-indigo-100", text: "text-indigo-600" },
    width: 600,
    height: 450,
    sizes: "(max-width: 992px) 50vw, 25vw",
    gridClass: "lg:col-start-7 lg:col-span-3 lg:row-start-4",
    delay: 0.25,
    variant: "fadeUp",
  },
];

/* ═══════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════ */

export function FeatureShowcase() {
  const t = useTranslations("FeatureShowcase");

  return (
    <section
      aria-labelledby="features-heading"
      className="relative w-full bg-white overflow-hidden py-16 md:py-24 lg:py-32"
    >
      {/* Subtle decorative background gradient */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(228,86,224,0.06) 0%, rgba(21,184,255,0.03) 40%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-5">
          {/* ─────────────────────────────────────────
              Heading — center of the bento grid
              On mobile: first item (full width)
              On desktop: col 4–9, rows 2–3
              ───────────────────────────────────────── */}
          <div
            className={cn(
              "col-span-2 lg:col-start-4 lg:col-span-6 lg:row-start-2 lg:row-span-2",
              "order-first lg:order-none",
              "flex flex-col items-center justify-center text-center",
              "py-10 md:py-12 lg:py-0",
              "relative"
            )}
          >
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <h2
                id="features-heading"
                className="relative text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-[1.1] font-medium tracking-[-0.06em] text-black max-w-[520px]"
              >
                {t("heading")}
              </h2>

              <Link
                href="/modules/lead-engagement"
                className="relative inline-flex items-center gap-3 mt-7 md:mt-8 text-base tracking-[-0.03em] text-black group"
              >
                <span className="font-medium">{t("learnMore")}</span>
                <span
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-full",
                    "bg-black text-white",
                    "motion-safe:transition-transform duration-300",
                    "group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  )}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className="rtl:rotate-180"
                  >
                    <path
                      d="M1 6h10M7 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </ScrollReveal>
          </div>

          {/* ─────────────────────────────────────────
              Feature Cards (7 standard cards)
              ───────────────────────────────────────── */}
          {FEATURES.map((feature) => (
            <ScrollReveal
              key={feature.id}
              variant={feature.variant}
              delay={feature.delay}
              className={cn("min-w-0", feature.gridClass)}
            >
              <FeatureCard feature={feature} t={t} />
            </ScrollReveal>
          ))}

          {/* ─────────────────────────────────────────
              Phone Calls — tall card, right anchor
              col 10–12, rows 2–4 (3 rows tall)
              ───────────────────────────────────────── */}
          <ScrollReveal
            variant="fadeRight"
            delay={0.2}
            className="col-span-2 lg:col-start-10 lg:col-span-3 lg:row-start-2 lg:row-span-3 min-w-0"
          >
            <div
              className={cn(
                "group relative h-full",
                "bg-gradient-to-b from-rose-50/80 via-white to-white",
                "rounded-[20px] p-3.5 md:p-4",
                "border border-black/[0.06] ring-1 ring-inset ring-black/[0.02]",
                "motion-safe:transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]",
                "hover:border-black/[0.1]",
                "overflow-hidden"
              )}
            >
              {/* Label */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-rose-50 ring-1 ring-rose-100 text-rose-600">
                <Phone className="w-3.5 h-3.5" />
                {t("phoneCalls")}
              </div>

              {/* Phone mockup */}
              <div className="mt-3 rounded-xl overflow-hidden flex justify-center">
                <Image
                  src="/images/features/calls.png"
                  alt="Incoming call from Placy AI"
                  width={400}
                  height={700}
                  sizes="(max-width: 992px) 80vw, 25vw"
                  className="w-full max-w-[260px] lg:max-w-none h-auto motion-safe:transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   Individual Feature Card
   ═══════════════════════════════════════════════════════ */

function FeatureCard({
  feature,
  t,
}: {
  feature: FeatureItem;
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "group relative h-full",
        "bg-[#fafafa] rounded-[20px] p-3.5 md:p-4",
        "border border-black/[0.06] ring-1 ring-inset ring-black/[0.02]",
        "motion-safe:transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]",
        "hover:border-black/[0.1]"
      )}
    >
      {/* Colored label pill */}
      <div
        className={cn(
          "inline-flex items-center gap-1.5",
          "px-2.5 py-1.5 rounded-full",
          "text-xs font-medium",
          "ring-1 ring-inset",
          feature.accent.pill,
          feature.accent.text
        )}
      >
        <Icon className="w-3.5 h-3.5" />
        {t(feature.labelKey)}
      </div>

      {/* Screenshot */}
      <div className="mt-3 rounded-xl overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.alt}
          width={feature.width}
          height={feature.height}
          sizes={feature.sizes}
          className="w-full h-auto motion-safe:transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
