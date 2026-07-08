import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";

interface FeatureDetail {
    title: string;
    value: string;
}

interface ExperienceDetailData {
    heroImage: string;
    sectionTitle: string;
    extendedDesc: string;
    details: FeatureDetail[];
    gallery: string[];
}

const experiencesDetailData: Record<string, ExperienceDetailData> = {
    dining: {
        heroImage: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000",
        sectionTitle: "THE ART OF CYCLADIC GASTRONOMY",
        extendedDesc: "Led by our award-winning culinary team, dinner at Aethra is an avant-garde exploration of Aegean heritage. Our ingredients are harvested daily from our private estate gardens and local artisanal cooperatives. Every dish is paired with historical volcanic wines to create a sensory narrative of the island's unique terroir.",
        details: [
            { title: "Cuisine Type", value: "Modern Aegean / Fine Dining" },
            { title: "Dress Code", value: "Smart Casual / Elegant Resort Wear" },
            { title: "Seating Capacity", value: "24 Private Pavilions" },
            { title: "Signature Dish", value: "Slow-cooked Aegean Octopus with Smoked Fava" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000"
        ]
    },
    wellness: {
        heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000",
        sectionTitle: "HOLISTIC ALCHEMY & SILENCE",
        extendedDesc: "Soma Sanctuary redefines physical restoration through the alignment of geometry and natural elements. Carved into the dramatic volcanic cliff side, our subterranean chambers feature heated stone tables, pure saltwater hydrotherapy, and a comprehensive collection of elemental treatments tailored to your bio-rhythms.",
        details: [
            { title: "Facilities", value: "Volcanic Steam Room, Ice Plunge, Saltwater Pool" },
            { title: "Therapies", value: "Geometric Stone Massage, Holistic Aromatherapy" },
            { title: "Products", value: "Organic Aegean Botanicals & Marine Minerals" },
            { title: "Privilege", value: "Complementary Daily Sunrise Yoga Session" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000",
            "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000",
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000"
        ]
    },
    yachting: {
        heroImage: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2000",
        sectionTitle: "CHARTER THE UNTAMED HORIZON",
        extendedDesc: "Set sail aboard Aethra's custom catamaran fleet to witness the legendary Santorini sunset away from the crowds. Traverse the volcanic caldera, dive into secluded thermal coves, and explore pristine forgotten beaches. Our elite crew ensures absolute privacy and handles every detail, from champagne service to custom multi-day itineraries.",
        details: [
            { title: "Vessel Fleet", value: "Luxury 55ft Catamarans & Sleek Motor Yachts" },
            { title: "Base Port", value: "Ammoudi Private Pier / Direct Resort Transfer" },
            { title: "Inclusions", value: "Private Chef, Open Premium Bar, Snorkeling Gear" },
            { title: "Capacity", value: "Up to 12 Guests per private charter" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000",
            "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1000",
            "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1000"
        ]
    },
    wine: {
        heroImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2000",
        sectionTitle: "THE GEOLOGY OF VOLCANIC VINTAGES",
        extendedDesc: "Santorini holds some of the oldest self-rooted vineyards in prehistoric Europe. Guided by our resident head sommelier, step inside 'The Sacred Cellar' to decode the intense minerality and crisp acidity of aged Assyrtiko, Nykteri, and historical Vinsanto. Private tastings are hosted in a geometric cave setting that amplifies the tasting experience.",
        details: [
            { title: "Cellar Holdings", value: "Over 350 Rare Cycladic & Global Labels" },
            { title: "Tasting Types", value: "Terroir Masterclass, Blind Tasting, Cheese Pairings" },
            { title: "Curated By", value: "Resort Head Sommelier & Master of Wine guests" },
            { title: "Duration", value: "90 to 120 Minutes of immersive tasting" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1528823872057-9c018a7a72b5?q=80&w=1000",
            "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=1000",
            "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1000"
        ]
    }
};

interface ExperienceDetailPageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
    const { slug } = await params;
    const exp = experiencesDetailData[slug];

    // 404 Guard Rail αν το slug δεν είναι έγκυρο
    if (!exp) notFound();

    const t = await getTranslations("Experiences");
    const expName = t(slug);

    return (
        <main className="min-h-screen bg-aegean-white">

            {/* 1. Immersive Full-Screen Hero */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-aegean-deep">
                <img
                    src={exp.heroImage}
                    alt={expName}
                    className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-aegean-white" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aegean-sky mb-4 block">
            BESPOKE EXPERIENCES
          </span>
                    <h1 className="text-4xl md:text-7xl font-light tracking-tight text-white uppercase mb-4 leading-tight">
                        {expName}
                    </h1>
                    <div className="w-16 h-[1px] bg-white/30 mx-auto" />
                </div>
            </section>

            {/* 2. Editorial Narrative & Specifications Matrix */}
            <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* Narrative Side */}
                <div className="lg:col-span-2 space-y-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-aegean-sky block">
            {exp.sectionTitle}
          </span>
                    <div className="space-y-6 text-aegean-deep/80 font-light text-sm md:text-base leading-relaxed">
                        <p>{exp.extendedDesc}</p>
                        <p>
                            We believe that authentic travel is an art form. Our curators are permanently available to modify details, secure prime-time allocations, or transition any of these concepts into a completely private milestone celebration.
                        </p>
                    </div>
                </div>

                {/* Technical Details Sidebar Card */}
                <div className="bg-white border border-aegean-mist p-8 h-max shadow-sm">
                    <h3 className="text-xs font-bold tracking-widest text-aegean-deep uppercase mb-6 pb-4 border-b border-aegean-mist">
                        {t("spec_title")}
                    </h3>
                    <div className="space-y-6">
                        {exp.details.map((detail, idx) => (
                            <div key={idx} className="space-y-1">
                <span className="text-[10px] text-aegean-deep/40 uppercase font-medium tracking-wider block">
                  {detail.title}
                </span>
                                <span className="text-xs text-aegean-deep font-light block leading-relaxed">
                  {detail.value}
                </span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full bg-aegean-deep hover:bg-aegean-sky text-white text-[11px] font-bold tracking-widest uppercase py-4 transition-colors mt-8 rounded-none">
                        {t("inquire")}
                    </button>
                </div>
            </section>

            {/* 3. Immersive Photography Showcase */}
            <section className="bg-white border-t border-b border-aegean-mist py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">
              VISUAL CHRONICLES
            </span>
                        <h2 className="text-2xl font-light text-aegean-deep uppercase tracking-tight">
                            CAPTURING THE MOMENT
                        </h2>
                    </div>

                    {/* Minimal Editorial Photo Set */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {exp.gallery.map((imgUrl, idx) => (
                            <div key={idx} className="h-[35vh] min-h-[250px] overflow-hidden border border-aegean-mist bg-aegean-white">
                                <img
                                    src={imgUrl}
                                    alt={`${expName} visual detailed view ${idx + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Contact Section */}
            <ContactSection />
        </main>
    );
}