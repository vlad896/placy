"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

/* Feature data: translation key + href (href doesn't change per locale) */
const FEATURES = [
  { key: "addKnowledge", href: "/feature/add-knowledge" },
  { key: "chatOnWhatsApp", href: "/feature/chat-on-whatsapp" },
  { key: "scoreQualifyLeads", href: "/feature/score-qualify-leads" },
  { key: "contactClients", href: "/feature/contact-clients" },
  { key: "transferDialogues", href: "/feature/transfer-dialogues" },
  { key: "chatOnViber", href: "/feature/chat-on-viber" },
  { key: "webApp", href: "/feature/web-app" },
  { key: "transcribeCalls", href: "/feature/transcribe-calls" },
  { key: "makePhoneCalls", href: "/feature/make-phone-calls" },
  { key: "chatOnWebsite", href: "/feature/chat-on-website" },
  { key: "getBusinessInsights", href: "/feature/get-business-insights" },
  { key: "askAnswerQuestions", href: "/feature/ask-answer-questions" },
  { key: "takeOverDialogues", href: "/feature/take-over-dialogues" },
  { key: "enableMultitasking", href: "/feature/enable-multi-tasking" },
  { key: "customizeFast", href: "/feature/customize-fast" },
  { key: "scaleProcesses", href: "/feature/scale-processes" },
  { key: "useAutomations", href: "/feature/zero-click-automations" },
  { key: "receivePhoneCalls", href: "/feature/receive-phone-calls" },
  { key: "understandNaturalLanguage", href: "/feature/understand-natural-language" },
  { key: "seePhoneNumber", href: "/feature/see-phone-number" },
  { key: "connectCRM", href: "/feature/connect-crm" },
  { key: "bookAppointments", href: "/feature/book-a-meeting" },
  { key: "optimizeTechStack", href: "/feature/optimize-tech-stack" },
  { key: "customizeVoice", href: "/feature/customize-voice" },
  { key: "analyzePerformance", href: "/feature/analyze-performance" },
  { key: "replyAnytime", href: "/feature/reply-anytime" },
  { key: "saveHistory", href: "/feature/save-history" },
  { key: "promoteAdditionalServices", href: "/feature/promote-additional-services" },
  { key: "writeEmails", href: "/feature/write-emails" },
  { key: "chatOnTelegram", href: "/feature/chat-on-telegram" },
  { key: "customizeTheAssistant", href: "/feature/customize-the-assistant" },
  { key: "getNotifications", href: "/feature/get-notifications" },
  { key: "routeLeads", href: "/feature/time-based-router" },
  { key: "integrateTools", href: "/feature/integrate-tools" },
  { key: "followUpLeads", href: "/feature/follow-up-leads" },
  { key: "greetIncomingLeads", href: "/feature/greet-incoming-leads" },
  { key: "speakMultipleLanguages", href: "/feature/speak-multiple-languages" },
  { key: "matchProperties", href: "/feature/match-properties" },
];

export function FeaturesGrid() {
  const t = useTranslations("FeaturesGrid");

  return (
    <section className="w-full bg-black flex flex-col items-center px-4 md:px-6 lg:px-10 py-20 md:py-[104px] lg:py-[120px]">
      <div className="w-full max-w-[1440px] flex flex-col items-center">
        <ScrollReveal variant="fadeUp" className="text-center mb-12 md:mb-16">
          <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-tight font-medium tracking-[-0.06em] text-white">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.15} className="w-full">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-[1200px] mx-auto">
            {FEATURES.map((feature) => (
              <Link
                key={feature.key}
                href={feature.href}
                className={cn(
                  "border border-white/25 rounded-full",
                  "px-3 py-2",
                  "text-sm md:text-base leading-none tracking-[-0.04em]",
                  "text-white/80",
                  "transition-all duration-200",
                  "hover:border-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {t(feature.key)}
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.3} className="mt-12 md:mt-16">
          <Link
            href="#"
            className={cn(
              "flex items-center justify-center",
              "px-7 py-3.5",
              "text-base font-medium tracking-[-0.04em]",
              "text-black bg-white rounded-full",
              "transition-colors duration-200 hover:bg-white/90"
            )}
          >
            {t("bookDemo")}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
