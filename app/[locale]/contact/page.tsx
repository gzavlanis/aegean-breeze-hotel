import { getTranslations } from "next-intl/server";
import ContactSection from "@/components/ContactSection";
import { IconMapPin, IconPhone, IconGlobe } from "@/components/AegeanIcons";

interface Department {
    name: string;
    email: string;
    phone: string;
}

interface TravelRoute {
    mode: string;
    duration: string;
    description: string;
}

const departments: Department[] = [
    { name: "General Reservations", email: "stay@aethrasantorini.com", phone: "+30 22860 00000" },
    { name: "Concierge & Bespoke Experiences", email: "concierge@aethrasantorini.com", phone: "+30 22860 00001" },
    { name: "Events & Private Celebrations", email: "events@aethrasantorini.com", phone: "+30 22860 00002" }
];

const travelRoutes: TravelRoute[] = [
    { mode: "From Santorini International Airport (JTR)", duration: "15 Minutes", description: "Private luxury chauffeur service or helicopter transfer directly to our helipad allocation." },
    { mode: "From Athinios Port", duration: "25 Minutes", description: "Sailing transfer via our private tender fleet or scenic drive through the Caldera cliffs." }
];

interface ContactPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
    // Unwrapping params ασύγχρονα
    await params;
    const t = await getTranslations("Contact");

    return (
        <main className="min-h-screen bg-aegean-white">

            {/* 1. Immersive Hero Banner */}
            <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-aegean-deep">
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
                    alt="Aethra Santorini Contact"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-aegean-white/10" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-aegean-sky mb-4 block drop-shadow-sm">
            CONCIERGE DESK
          </span>
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white uppercase mb-6 leading-tight drop-shadow-md">
                        {t("title")}
                    </h1>
                    <div className="w-12 h-[1px] bg-white/40 mx-auto mb-6" />
                    <p className="text-white/90 max-w-2xl text-xs md:text-sm leading-relaxed font-light mx-auto drop-shadow-sm">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-aegean-white to-transparent pointer-events-none" />
            </section>

            {/* 2. Department & Direct Communication Directory */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center md:text-left mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">
            {t("directory_title")}
          </span>
                    <h2 className="text-2xl font-light text-aegean-deep uppercase tracking-tight">
                        {t("directory_subtitle")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {departments.map((dept, idx) => (
                        <div key={idx} className="bg-white border border-aegean-mist p-8 flex flex-col justify-between shadow-sm hover:border-aegean-sky/40 transition-colors">
                            <div>
                                <h3 className="text-sm font-bold text-aegean-deep uppercase tracking-wider mb-4 pb-2 border-b border-aegean-mist/50">
                                    {dept.name}
                                </h3>
                                <p className="text-xs text-aegean-deep/40 uppercase tracking-widest font-medium mb-1">Email</p>
                                <a href={`mailto:${dept.email}`} className="text-xs text-aegean-sky font-light block hover:underline mb-4">
                                    {dept.email}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-aegean-deep/40 uppercase tracking-widest font-medium mb-1">Direct Line</p>
                                <a href={`tel:${dept.phone}`} className="text-xs text-aegean-deep font-light block hover:text-aegean-sky transition-colors">
                                    {dept.phone}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Luxury Arrival Chronicles (Οδηγίες Άφιξης) */}
            <section className="bg-white border-t border-b border-aegean-mist py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

                    <div className="lg:col-span-1 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky block">
              {t("access_title")}
            </span>
                        <h2 className="text-2xl font-light text-aegean-deep uppercase tracking-tight leading-tight">
                            {t("access_subtitle")}
                        </h2>
                        <p className="text-aegean-deep/70 font-light text-xs md:text-sm leading-relaxed">
                            {t("access_desc")}
                        </p>

                        {/* Quick Contact Specs */}
                        <div className="space-y-3 pt-6 text-xs text-aegean-deep/80 font-light">
                            <div className="flex items-center gap-3">
                                <IconMapPin className="w-4 h-4 text-aegean-sky" />
                                <span>{t("location_value")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IconPhone className="w-4 h-4 text-aegean-sky" />
                                <span>+30 22860 00000</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IconGlobe className="w-4 h-4 text-aegean-sky" />
                                <span>www.aethrasantorini.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        {travelRoutes.map((route, idx) => (
                            <div key={idx} className="border border-aegean-mist p-6 bg-aegean-white/40 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <h4 className="text-xs font-bold text-aegean-deep uppercase tracking-wide">
                                        {route.mode}
                                    </h4>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky bg-aegean-white border border-aegean-mist px-2.5 py-1 w-max">
                    {route.duration}
                  </span>
                                </div>
                                <p className="text-xs text-aegean-deep/70 font-light leading-relaxed">
                                    {route.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 4. The Master Interactive Contact Block (Φόρμα & Χάρτης) */}
            <div className="bg-aegean-white pt-12">
                <ContactSection />
            </div>

        </main>
    );
}