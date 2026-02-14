import { getTranslations } from "next-intl/server";

const LOGOS = [
  { src: "/images/logos/kw-seven.avif", alt: "KW Seven" },
  { src: "/images/logos/domenica-group.avif", alt: "Domenica Group" },
  { src: "/images/logos/apartments-toronto.avif", alt: "Apartments Toronto" },
  { src: "/images/logos/delfi.avif", alt: "Delfi" },
  { src: "/images/logos/greekhome.avif", alt: "Greek Home" },
  { src: "/images/logos/chara.avif", alt: "Chara" },
  { src: "/images/logos/myspace.avif", alt: "MySpace" },
  { src: "/images/logos/sweet-home-estates.png", alt: "Sweet Home Estates" },
  { src: "/images/logos/remax.avif", alt: "RE/MAX" },
  { src: "/images/logos/squareone.avif", alt: "Square One" },
  { src: "/images/logos/livadhiotis.avif", alt: "Livadhiotis" },
  { src: "/images/logos/century21.avif", alt: "Century 21" },
  { src: "/images/logos/replace.avif", alt: "Replace" },
  { src: "/images/logos/movingdoors.avif", alt: "Moving Doors" },
  { src: "/images/logos/ipn.avif", alt: "IPN" },
  { src: "/images/logos/4buyandsell.avif", alt: "4 Buy & Sell" },
  { src: "/images/logos/askwire.avif", alt: "Askwire" },
];

export async function LogoCarousel() {
  const t = await getTranslations("LogoCarousel");

  return (
    <section
      aria-label={t("heading")}
      className="flex flex-col items-center gap-8 w-full py-12 overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4">
        <img
          src="/images/trust-icon.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
          className="h-5 w-5 invert"
        />
        <p className="text-base tracking-[-0.03em] text-black">
          {t("heading")}
        </p>
      </div>

      <div className="relative w-full">
        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* CSS marquee — duplicated for seamless loop */}
        <div className="flex animate-marquee" role="presentation">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="flex shrink-0 items-center"
              aria-hidden={setIndex === 1}
            >
              {LOGOS.map((logo) => (
                <div
                  key={`${setIndex}-${logo.alt}`}
                  className="flex items-center justify-center h-[50px] w-[160px] px-5 shrink-0"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={40}
                    className="h-full w-full object-contain max-h-[40px] invert"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
