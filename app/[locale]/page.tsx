import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import RoomsGrid from "@/components/RoomsGrid";
import Testimonials from "@/components/Testimonials";
import MasonryGallery from "@/components/MasonryGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
      <main className="relative min-h-screen bg-white">
        <Header />

        <Hero />

        <Experiences />

        <RoomsGrid />

        <Testimonials />

        <MasonryGallery />

        <ContactSection />

        <Footer />
      </main>
  );
}