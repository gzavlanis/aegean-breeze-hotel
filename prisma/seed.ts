import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
    console.log("⏳ Clear old data...");
    await prisma.booking.deleteMany({});
    await prisma.room.deleteMany({});
    await prisma.landmark.deleteMany({});
    await prisma.experience.deleteMany({});

    console.log("🌱 Φύτευση και των 8 Curated Landmarks (Map Pins)...");
    await prisma.landmark.createMany({
        data: [
            {
                slug: "pin-oia",
                nameKey: "oia",
                descKey: "oia_desc",
                distance: "10 km",
                image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600",
                websiteUrl: "https://www.visitgreece.gr",
                lat: 36.4618,
                lng: 25.3753,
                category: "heritage"
            },
            {
                slug: "pin-akrotiri",
                nameKey: "akrotiri",
                descKey: "akrotiri_desc",
                distance: "22 km",
                image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=600",
                websiteUrl: "https://www.odysseus.culture.gr",
                lat: 36.3514,
                lng: 25.4029,
                category: "heritage"
            },
            {
                slug: "pin-pyrgos",
                nameKey: "pyrgos",
                descKey: "pyrgos_desc",
                distance: "7.5 km",
                image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=600",
                websiteUrl: "https://www.visitgreece.gr",
                lat: 36.3835,
                lng: 25.4482,
                category: "heritage"
            },
            {
                slug: "pin-selene",
                nameKey: "selene",
                descKey: "selene_desc",
                distance: "8 km",
                image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
                websiteUrl: "https://selene.gr",
                lat: 36.3862,
                lng: 25.4485,
                category: "dining"
            },
            {
                slug: "pin-amoudi",
                nameKey: "amoudi",
                descKey: "amoudi_desc",
                distance: "11 km",
                image: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?q=80&w=600",
                websiteUrl: "https://www.visitgreece.gr",
                lat: 36.4594,
                lng: 25.3692,
                category: "dining"
            },
            {
                slug: "pin-vlychada",
                nameKey: "vlychada",
                descKey: "vlychada_desc",
                distance: "19 km",
                image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600",
                websiteUrl: "https://www.visitgreece.gr",
                lat: 36.3394,
                lng: 25.4322,
                category: "beach"
            },
            {
                slug: "pin-redbeach",
                nameKey: "redbeach",
                descKey: "redbeach_desc",
                distance: "23 km",
                image: "https://images.unsplash.com/photo-1560242375-73130d210515?q=80&w=600",
                websiteUrl: "https://www.visitgreece.gr",
                lat: 36.3481,
                lng: 25.3948,
                category: "beach"
            },
            {
                slug: "pin-perivolos",
                nameKey: "perivolos",
                descKey: "perivolos_desc",
                distance: "17 km",
                image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=600",
                websiteUrl: "https://www.visitgreece.gr",
                lat: 36.3458,
                lng: 25.4655,
                category: "beach"
            }
        ]
    });

    console.log("🌱 Φύτευση Ολόκληρης της Συλλογής Luxury Suites με Φωτογραφικό Υλικό (Gallery)...");

    // 1. Suite: Caldera Grand View Suite
    await prisma.room.create({
        data: {
            slug: "caldera-grand-suite",
            nameKey: "suite_caldera_title",
            descKey: "suite_caldera_desc",
            basePrice: 450.00,
            maxGuests: 2,
            sqMeters: 55,
            amenities: JSON.stringify(["private_pool", "wifi", "king_bed", "sea_view", "mini_bar"]),
            mainImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800",
                "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?q=80&w=800",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800"
            ])
        }
    });

    // 2. Suite: Aegean Infinity Private Pool Suite
    await prisma.room.create({
        data: {
            slug: "aegean-infinity-suite",
            nameKey: "suite_infinity_title",
            descKey: "suite_infinity_desc",
            basePrice: 650.00,
            maxGuests: 2,
            sqMeters: 70,
            amenities: JSON.stringify(["infinity_pool", "wifi", "king_bed", "caldera_view", "concierge_24h"]),
            mainImage: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"
            ])
        }
    });

    // 3. Suite: Honeymoon Cliffside Sanctuary
    await prisma.room.create({
        data: {
            slug: "honeymoon-sanctuary-suite",
            nameKey: "suite_honeymoon_title",
            descKey: "suite_honeymoon_desc",
            basePrice: 850.00,
            maxGuests: 2,
            sqMeters: 85,
            amenities: JSON.stringify(["outdoor_jacuzzi", "wifi", "champagne_welcome", "panoramic_sunset"]),
            mainImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
                "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800"
            ])
        }
    });

    // 4. Suite: Oia Royal Aegean Villa (Top Tier)
    await prisma.room.create({
        data: {
            slug: "royal-aegean-villa",
            nameKey: "suite_royal_title",
            descKey: "suite_royal_desc",
            basePrice: 1400.00,
            maxGuests: 4,
            sqMeters: 140,
            amenities: JSON.stringify(["private_infinity_pool", "wifi", "two_bedrooms", "private_chef_available", "sunset_terrace"]),
            mainImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
            images: JSON.stringify([
                "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
                "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=800"
            ])
        }
    });

    console.log("🌱 Φύτευση Premium Resort Experiences...");
    await prisma.experience.createMany({
        data: [
            {
                slug: "private-catamaran-sunset",
                nameKey: "exp_catamaran_title",
                descKey: "exp_catamaran_desc",
                price: 250.00,
                duration: "5 Hours",
                mainImage: "https://images.unsplash.com/photo-1505080856163-267d49b30626?q=80&w=800"
            },
            {
                slug: "volcanic-wine-tasting",
                nameKey: "exp_wine_title",
                descKey: "exp_wine_desc",
                price: 120.00,
                duration: "3 Hours",
                mainImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800"
            },
            {
                slug: "helicopter-caldera-tour",
                nameKey: "exp_helicopter_title",
                descKey: "exp_helicopter_desc",
                price: 600.00,
                duration: "30 Mins",
                mainImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800"
            }
        ]
    });

    console.log("✅ Όλα τα δεδομένα, οι φωτογραφίες και οι εμπειρίες συγχρονίστηκαν επιτυχώς στη MySQL!");
}

main()
    .catch((e) => {
        console.error("❌ Σφάλμα κατά το database seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });