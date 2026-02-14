"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const Lottie = lazy(() => import("lottie-react"));

const ROTATOR_KEYS = [
  "rotator1",
  "rotator2",
  "rotator3",
  "rotator4",
  "rotator5",
] as const;

const INTERVAL_MS = 3000;

export function HeroSection() {
  const t = useTranslations("Hero");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lottieData, setLottieData] = useState<object | null>(null);

  /* ── Text rotator (respects prefers-reduced-motion) ── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROTATOR_KEYS.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  /* ── Lazy-load Lottie JSON (877 KB) only after idle ── */
  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetch("/lottie/hero-animation.json")
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled) setLottieData(data);
        })
        .catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(load);
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    } else {
      const id = setTimeout(load, 200);
      return () => {
        cancelled = true;
        clearTimeout(id);
      };
    }
  }, []);

  return (
    <section className="relative w-full min-h-[750px] h-[80vh] flex flex-col lg:flex-row overflow-hidden">
      {/* Hero background — priority (above the fold, LCP candidate) */}
      <Image
        src="/images/hero/bg-gradient.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover z-0"
        aria-hidden="true"
      />

      {/* ── Left: Text Content ── */}
      <div
        className={cn(
          "relative z-10 w-full lg:w-1/2",
          "flex flex-col justify-center items-start",
          "px-4 md:px-6 lg:px-10",
          "pt-[120px] pb-16 md:pt-[104px] lg:pt-[120px] lg:pb-[64px]"
        )}
      >
        <div className="flex flex-col gap-8 max-w-[686px]">
          {/* Heading with text rotator — sr-only live region for screen readers */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {t(ROTATOR_KEYS[currentIndex])} {t("forRealEstate")}
          </div>

          <h1 className="-ml-4 rtl:ml-0 rtl:-mr-4" aria-hidden="true">
            <span className="relative block w-max">
              {ROTATOR_KEYS.map((key, i) => (
                <span
                  key={key}
                  className={cn(
                    "text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]",
                    "leading-[2.5rem] md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[4rem]",
                    "font-medium tracking-[-0.06em] text-black",
                    "bg-white/80 backdrop-blur-sm px-4 py-1 rounded-2xl",
                    "motion-safe:transition-all motion-safe:duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    i === currentIndex
                      ? "relative opacity-100 translate-y-0 pointer-events-auto"
                      : "absolute left-0 top-0 opacity-0 translate-y-[0.22em] pointer-events-none"
                  )}
                >
                  {t(key)}
                </span>
              ))}
            </span>

            <span
              className={cn(
                "block mt-1",
                "text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]",
                "leading-[2.5rem] md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[4rem]",
                "font-medium tracking-[-0.06em] text-black"
              )}
            >
              {t("forRealEstate")}
            </span>
          </h1>

          <p className="text-base leading-6 tracking-[-0.03em] text-black max-w-[460px]">
            {t("description")}
          </p>

          <div className="flex flex-row gap-4">
            <Link
              href="#"
              className={cn(
                "flex items-center justify-center",
                "px-7 py-3.5",
                "text-lg md:text-base leading-7 tracking-[-0.04em] font-medium",
                "text-white bg-black",
                "rounded-full",
                "transition-colors duration-200 hover:bg-black/85"
              )}
            >
              {t("bookDemo")}
            </Link>
            <Link
              href="/pages/placy-pro-ai-demo-listing"
              className={cn(
                "flex items-center justify-center",
                "px-7 py-3.5",
                "text-lg md:text-base leading-7 tracking-[-0.04em] font-medium",
                "text-black bg-transparent",
                "border border-black rounded-full",
                "transition-colors duration-200 hover:bg-black hover:text-white"
              )}
            >
              {t("tryPlacy")}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Right: Lottie Animation (lazy loaded with Suspense) ── */}
      <div
        className={cn(
          "relative z-10 w-full lg:w-1/2",
          "flex items-center justify-center",
          "px-4 pb-10 lg:px-10 lg:py-[120px]"
        )}
      >
        {lottieData && (
          <Suspense
            fallback={
              <div className="w-full max-w-[500px] aspect-square animate-pulse rounded-3xl bg-white/20" />
            }
          >
            <div className="w-full max-w-[500px] motion-reduce:hidden">
              <Lottie animationData={lottieData} loop />
            </div>
          </Suspense>
        )}
      </div>
    </section>
  );
}
