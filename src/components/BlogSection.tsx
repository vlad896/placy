import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

const BLOG_POSTS = [
  { key: "post1Title", image: "/images/blog/hiring.avif", href: "/post/we-are-hiring-oct-2025" },
  { key: "post2Title", image: "/images/blog/copilot.avif", href: "/post/phone-and-messenger-leads-that-convert---heres-how" },
  { key: "post3Title", image: "/images/blog/kpmg-award.avif", href: "/post/placy-wins-audience-choice-award-at-kpmg-sil-investor-day" },
];

export async function BlogSection() {
  const t = await getTranslations("Blog");

  return (
    <section aria-labelledby="blog-heading" className="w-full bg-white flex flex-col items-center px-4 md:px-6 lg:px-10 py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-[1440px]">
        <ScrollReveal variant="fadeUp">
          <h2
            id="blog-heading"
            className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-tight font-medium tracking-[-0.06em] text-black text-center mb-10 md:mb-14"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 lg:gap-8">
          {BLOG_POSTS.map((post, i) => (
            <ScrollReveal key={post.key} variant="fadeUp" delay={i * 0.1}>
              <article className="flex flex-col">
                <a href={post.href} className="relative w-full pt-[66%] rounded-2xl overflow-hidden border border-black/5 group block">
                  <Image
                    src={post.image}
                    alt={t(post.key)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.03]"
                  />
                </a>
                <a href={post.href} className="mt-4 block">
                  <h3 className="text-base font-medium tracking-[-0.03em] text-black text-start leading-snug hover:underline">
                    {t(post.key)}
                  </h3>
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fadeUp" delay={0.2} className="flex justify-center mt-10">
          <a
            href="/blogs"
            className={cn(
              "flex items-center justify-center",
              "px-7 py-3",
              "text-base font-medium tracking-[-0.04em]",
              "text-black border border-black rounded-full",
              "transition-colors duration-200 hover:bg-black hover:text-white"
            )}
          >
            {t("viewAll")}
          </a>
        </ScrollReveal>

        <div className="w-full h-px bg-black/10 mt-12" aria-hidden="true" />
      </div>
    </section>
  );
}
