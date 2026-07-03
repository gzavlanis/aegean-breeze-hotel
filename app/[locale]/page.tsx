import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import RoomsGrid from "@/components/RoomsGrid";
import Testimonials from "@/components/Testimonials";
import MasonryGallery from "@/components/MasonryGallery";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
    return (
        <>
            <Hero />

            <Experiences />

            <RoomsGrid teaser={true} />

            <Testimonials />

            <MasonryGallery />

            <ContactSection />
        </>
    );
}