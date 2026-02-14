"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

const FAQ_IDS = ["1", "2", "3", "4", "5"] as const;

export function FAQSection() {
  const t = useTranslations("FAQ");
  const [openId, setOpenId] = useState<string | null>(null);

  /* FAQ structured data for Google rich results */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_IDS.map((id) => ({
      "@type": "Question",
      name: t(`q${id}`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`a${id}`),
      },
    })),
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className={cn(
        "w-full bg-[#f2f2f2]",
        "flex flex-col items-center justify-center",
        "px-4 md:px-6",
        "py-20 md:py-[104px] lg:py-[120px] xl:py-[160px]",
        "rounded-b-[32px]"
      )}
    >
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ScrollReveal variant="fadeUp">
        <h2
          id="faq-heading"
          className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-tight font-medium tracking-[-0.06em] text-black text-center"
        >
          {t("heading")}
        </h2>
      </ScrollReveal>

      <div className="flex flex-col gap-3 mt-8 md:mt-12 w-full max-w-[714px]" role="list">
        {FAQ_IDS.map((id, i) => {
          const isOpen = openId === id;
          const panelId = `faq-panel-${id}`;
          const triggerId = `faq-trigger-${id}`;

          return (
            <ScrollReveal key={id} variant="fadeUp" delay={i * 0.05}>
              <div className="bg-[#e6e6e6] rounded-2xl overflow-hidden" role="listitem">
                <h3>
                  <button
                    id={triggerId}
                    onClick={() => setOpenId((prev) => (prev === id ? null : id))}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex items-start justify-between gap-2 w-full p-4 text-start"
                  >
                    <span className="text-[1.125rem] md:text-[1.25rem] font-medium tracking-[-0.06em] text-black leading-snug">
                      {t(`q${id}`)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-black/40 shrink-0 mt-0.5",
                        "motion-safe:transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      strokeWidth={2}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={cn(
                    "grid motion-safe:transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                      <p className="text-base leading-6 tracking-[-0.03em] text-black/70">
                        {t(`a${id}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
