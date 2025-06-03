
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeatureSection from "@/components/home/FeatureSection";
import BackgroundSection from "@/components/home/BackgroundSection";
import TrustedPartnersSection from "@/components/home/TrustedPartnersSection";
import FaqSection from "@/components/home/FaqSection";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeatureSection />
        <TrustedPartnersSection />
        <BackgroundSection />
        <FaqSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
