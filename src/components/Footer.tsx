import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { icon: "/images/social/youtube.svg", href: "https://www.youtube.com/@placyai", label: "YouTube" },
  { icon: "/images/social/telegram.svg", href: "https://t.me/s/placy_ai", label: "Telegram" },
  { icon: "/images/social/instagram.svg", href: "https://www.instagram.com/placy.ai/", label: "Instagram" },
  { icon: "/images/social/tiktok.svg", href: "https://www.tiktok.com/@placy", label: "TikTok" },
  { icon: "/images/social/facebook.svg", href: "https://www.facebook.com/placyai/", label: "Facebook" },
  { icon: "/images/social/linkedin.svg", href: "https://www.linkedin.com/company/placy-ai/", label: "LinkedIn" },
  { icon: "/images/social/threads.svg", href: "https://www.threads.net/@placy.ai", label: "Threads" },
  { icon: "/images/social/x.svg", href: "https://x.com/Placy_ai", label: "X" },
];

export async function Footer() {
  const t = await getTranslations("Footer");

  const LINK_GROUPS = [
    {
      title: t("quickLinks"),
      links: [
        { label: t("home"), href: "/" },
        { label: t("blog"), href: "/blogs" },
        { label: t("events"), href: "/events" },
        { label: t("media"), href: "/media" },
        { label: t("privacyNotice"), href: "/policies/privacy-notice" },
        { label: t("cookiesPolicy"), href: "/policies/cookies-policy" },
      ],
    },
    {
      title: t("comparisons"),
      links: [
        { label: t("placyVsChatGPT"), href: "/comparisons/placy-pro-vs-chatgpt" },
        { label: t("placyVsChatbotBuilders"), href: "/comparisons/placy-pro-vs-chatbots" },
        { label: t("placyVsCRMs"), href: "/comparisons/placy-pro-vs-crms" },
        { label: t("placyVsAutomations"), href: "/comparisons/placy-pro-vs-automations" },
        { label: t("placyVsInternalTools"), href: "/comparisons/placy-pro-vs-internal-tools" },
      ],
    },
    {
      title: t("countries"),
      links: [
        { label: t("cyprus"), href: "/countries/cyprus" },
        { label: t("greece"), href: "/countries/greece" },
        { label: t("spain"), href: "/countries/spain" },
        { label: t("uae"), href: "/countries/uae" },
        { label: t("uk"), href: "/countries/uk" },
        { label: t("usa"), href: "/countries/usa" },
        { label: t("canada"), href: "/countries/canada" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white flex flex-col items-center">
      <div
        className={cn(
          "flex flex-col justify-between gap-8 md:gap-20",
          "w-full max-w-[1440px]",
          "min-h-[600px] md:min-h-0",
          "px-4 md:px-6 lg:px-10",
          "pt-20 md:pt-20 lg:pt-[120px]",
          "pb-10 md:pb-6 lg:pb-10"
        )}
      >
        <div className="flex flex-col md:flex-row justify-between gap-8 w-full">
          <div className="shrink-0">
            <Image
              src="/images/footer/avatar.avif"
              alt="Placy AI Avatar"
              width={80}
              height={80}
              sizes="80px"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 flex-1 md:max-w-[800px]">
            {LINK_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-[1.25rem] font-medium tracking-[-0.05em] text-black">{group.title}</h3>
                <ul className="flex flex-col gap-3" role="list">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-base tracking-[-0.03em] text-black/70 hover:text-black transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-8 md:gap-16">
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="transition-opacity hover:opacity-60">
                <img src={social.icon} alt="" width={24} height={24} className="w-6 h-6" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-2 text-base tracking-[-0.03em] text-black">
            <span>{t("madeBy")}</span>
            <small className="text-base">{t("copyright")}</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
