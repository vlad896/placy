"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

/* Country cards — descriptions are already in native languages */
const COUNTRIES = [
  {
    name: "Spain",
    description: "La Revolución de la IA en el Sector Inmobiliario Llega con Placy Pro",
    image: "/images/countries/spain.avif",
    href: "/countries/spain",
  },
  {
    name: "Cyprus",
    description: "Γεια σας και καλώς ήρθατε στο μέλλον της τεχνητής νοημοσύνης στην Κύπρο!",
    image: "/images/countries/cyprus.avif",
    href: "/countries/cyprus",
  },
  {
    name: "Greece",
    description: "Εδώ όπου η Τεχνητή Νοημοσύνη απελευθερώνει το Real Estate",
    image: "/images/countries/greece.avif",
    href: "/countries/greece",
  },
  {
    name: "The UAE",
    description: "ثورة الذكاء الاصطناعي في قطاع العقارات الإماراتي تأتي مع Placy Pro",
    image: "/images/countries/uae.avif",
  },
  {
    name: "Saudi Arabia",
    description: "ثورة الذكاء الاصطناعي في قطاع العقارات السعودي تأتي مع Placy Pro",
    image: "/images/countries/saudi-arabia.avif",
  },
  {
    name: "The UK",
    description: "The AI Revolution in UK Real Estate Comes with Placy Pro",
    image: "/images/countries/uk.avif",
    comingSoon: true,
  },
  {
    name: "Canada",
    description: "The AI Revolution in Canada Real Estate Comes with Placy Pro",
    image: "/images/countries/canada.avif",
    comingSoon: true,
  },
  {
    name: "USA",
    description: "The AI Revolution in the USA Real Estate Comes with Placy Pro",
    image: "/images/countries/usa.avif",
    comingSoon: true,
  },
];

export function LocalizationSlider() {
  const t = useTranslations("LocalizationSlider");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="w-full bg-white flex flex-col items-center overflow-hidden pt-[60px] md:pt-[100px] lg:pt-[160px] pb-[60px] md:pb-[100px] lg:pb-[160px]">
      <ScrollReveal variant="fadeUp" className="flex flex-col items-center gap-6 max-w-[800px] px-4 text-center mb-12 md:mb-16">
        <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-tight font-medium tracking-[-0.06em] text-black">
          {t("heading")}
        </h2>
        <p className="text-base tracking-[-0.03em] text-black max-w-[686px]">
          {t("description")}
        </p>
      </ScrollReveal>

      <div className="w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 md:gap-4 lg:gap-5">
            {COUNTRIES.map((country, i) => {
              const isFirst = i === 0;
              const isLast = i === COUNTRIES.length - 1;
              const CardWrapper = country.href ? Link : "div";
              const wrapperProps = country.href ? { href: country.href } : {};

              return (
                <div
                  key={country.name}
                  className={cn(
                    "flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0",
                    isFirst && "ms-4 md:ms-6 lg:ms-10",
                    isLast && "me-4 md:me-6 lg:me-10"
                  )}
                >
                  <CardWrapper
                    {...(wrapperProps as any)}
                    className={cn(
                      "relative block w-full h-[320px] md:h-[400px] lg:h-[500px]",
                      "rounded-2xl overflow-hidden",
                      "group"
                    )}
                  >
                    <Image
                      src={country.image}
                      alt={country.name}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 992px) 45vw, 30vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
                    />
                    <div className="relative z-10 flex flex-col items-center gap-3 w-full h-1/2 pt-6 md:pt-12 lg:pt-16 px-3 md:px-8 lg:px-10 text-center">
                      <h3 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-medium tracking-[-0.06em] text-white drop-shadow-lg">
                        {country.name}
                      </h3>
                      <p className="text-sm md:text-base tracking-[-0.03em] text-white/90 drop-shadow-md max-w-[300px]">
                        {country.description}
                      </p>
                    </div>
                    {country.comingSoon && (
                      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-3 py-1.5 rounded-full">
                        {t("comingSoon")}
                      </div>
                    )}
                  </CardWrapper>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between mt-8 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10">
          <button
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label={t("prevSlide")}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border border-black/10 transition-colors",
              canPrev ? "hover:bg-black/5 cursor-pointer" : "opacity-30 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Slide navigation">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                role="tab"
                aria-selected={i === selectedIndex}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors duration-200",
                  i === selectedIndex ? "bg-black" : "bg-black/20"
                )}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            disabled={!canNext}
            aria-label={t("nextSlide")}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border border-black/10 transition-colors",
              canNext ? "hover:bg-black/5 cursor-pointer" : "opacity-30 cursor-not-allowed"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
