// app/page.tsx
"use client";

import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import LocationSection from "@/components/home/LocationSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/home/Footer";

export default function BakeryHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <LocationSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
