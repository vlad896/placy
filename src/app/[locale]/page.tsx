import { HeroSection } from "@/components/HeroSection";
import { LogoCarousel } from "@/components/LogoCarousel";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { LocalizationSlider } from "@/components/LocalizationSlider";
import { SuccessAndWhyUs } from "@/components/SuccessAndWhyUs";
import { FAQSection } from "@/components/FAQSection";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCarousel />
      <FeatureShowcase />
      <FeaturesGrid />
      <LocalizationSlider />
      <SuccessAndWhyUs />
      <FAQSection />
      <BlogSection />
      <Footer />
      <BackToTop />
    </>
  );
}
