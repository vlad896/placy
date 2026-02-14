"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

/* Testimonials: logo + avatar images don't change per locale */
const TESTIMONIALS = [
  { id: 1, logo: "/images/testimonials/4buyandsell-logo.avif", avatar: "/images/testimonials/avatar-1.avif", company: "4 Buy & Sell" },
  { id: 2, logo: "/images/testimonials/movingdoors-logo.avif", avatar: "/images/testimonials/avatar-2.avif", company: "Moving Doors" },
];

const WHY_US_KEYS = [
  "industry", "geographic", "ai", "integration", "data", "features", "cost", "support",
] as const;

export function SuccessAndWhyUs() {
  const tS = useTranslations("SuccessStories");
  const tW = useTranslations("WhyUs");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const MAX_TEXT = 200;

  return (
    <>
      {/* ── Success Stories ── */}
      <section
        aria-labelledby="success-heading"
        className="w-full bg-black flex flex-col items-center px-4 md:px-6 lg:px-10 pt-[60px] md:pt-[120px] lg:pt-[160px] pb-[80px] md:pb-[104px]"
      >
        <ScrollReveal variant="fadeUp">
          <h2 id="success-heading" className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-tight font-medium tracking-[-0.06em] text-white text-center">
            {tS("heading")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-[1440px] mt-12 px-0 md:px-6 lg:px-10">
          {TESTIMONIALS.map((t_item, i) => (
            <ScrollReveal key={t_item.id} variant="fadeUp" delay={i * 0.1}>
              <TestimonialCard
                testimonial={t_item}
                text={tS(`testimonial${t_item.id}Text`)}
                name={tS(`testimonial${t_item.id}Name`)}
                title={tS(`testimonial${t_item.id}Title`)}
                moreLabel={tS("more")}
                lessLabel={tS("less")}
                maxText={MAX_TEXT}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* ── Why Us ── */}
        <ScrollReveal variant="fadeUp" className="mt-[80px] md:mt-[120px]">
          <h2 id="why-us-heading" className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-tight font-medium tracking-[-0.06em] text-white text-center">
            {tW("heading")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[1440px] mt-12 px-0 md:px-6 lg:px-10">
          {WHY_US_KEYS.map((key, i) => (
            <ScrollReveal key={key} variant="fadeUp" delay={i * 0.05}>
              <WhyUsCard
                cardTitle={tW(`${key}Title`)}
                cardSub={tW(`${key}Sub`)}
                cardContent={tW(`${key}Content`)}
                isExpanded={expandedCard === key}
                onToggle={() =>
                  setExpandedCard((prev) => (prev === key ? null : key))
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Testimonial Card
   ═══════════════════════════════════════════════════════ */

function TestimonialCard({
  testimonial,
  text,
  name,
  title,
  moreLabel,
  lessLabel,
  maxText,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  text: string;
  name: string;
  title: string;
  moreLabel: string;
  lessLabel: string;
  maxText: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > maxText;
  const displayText = isLong && !expanded ? text.substring(0, maxText) + "..." : text;

  return (
    <article className="flex flex-col justify-between gap-8 bg-white/10 rounded-2xl p-6 h-full">
      <div className="flex flex-col gap-4">
        <div className="h-16 flex items-center">
          <Image
            src={testimonial.logo}
            alt={testimonial.company}
            width={200}
            height={64}
            sizes="200px"
            className="h-full w-auto object-contain max-h-16"
          />
        </div>
        <p className="text-base leading-6 tracking-[-0.03em] text-white text-start">
          {displayText}
          {isLong && (
            <button onClick={() => setExpanded(!expanded)} className="ms-1 underline text-white/80 hover:text-white">
              {expanded ? lessLabel : moreLabel}
            </button>
          )}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src={testimonial.avatar}
          alt={name}
          width={48}
          height={48}
          sizes="48px"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-base font-medium tracking-[-0.03em] text-white text-start">{name}</p>
          <p className="text-sm tracking-[-0.03em] text-white/50">{title}</p>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════
   Why Us Card
   ═══════════════════════════════════════════════════════ */

function WhyUsCard({
  cardTitle,
  cardSub,
  cardContent,
  isExpanded,
  onToggle,
}: {
  cardTitle: string;
  cardSub: string;
  cardContent: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn("border border-white/30 rounded-2xl overflow-hidden transition-colors duration-200", isExpanded && "border-white/50")}>
      <button onClick={onToggle} aria-expanded={isExpanded} className="flex items-start justify-between gap-4 w-full p-5 text-start">
        <div>
          <p className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-medium tracking-[-0.06em] text-white leading-tight">{cardTitle}</p>
          <p className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-medium tracking-[-0.06em] text-white leading-tight">{cardSub}</p>
        </div>
        <ChevronDown className={cn("h-6 w-6 text-white/50 shrink-0 mt-1 motion-safe:transition-transform duration-200", isExpanded && "rotate-180")} />
      </button>
      <div className={cn("grid motion-safe:transition-all duration-300 ease-out", isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            <p className="text-base leading-6 tracking-[-0.03em] text-white/70">{cardContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
