import mysql from "mysql2/promise";

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("DATABASE_URL is missing from environment variables.");
    }

    console.log("🔌 Connecting directly to MySQL via native driver...");
    const connection = await mysql.createConnection(connectionString);

    try {
        console.log("⏳ Clearing old data...");
        await connection.query("SET FOREIGN_KEY_CHECKS = 0;");
        await connection.query("TRUNCATE TABLE bookings;");
        await connection.query("TRUNCATE TABLE rooms;");
        await connection.query("TRUNCATE TABLE landmarks;");
        await connection.query("TRUNCATE TABLE experiences;");
        await connection.query("SET FOREIGN_KEY_CHECKS = 1;");

        const now = new Date();

        console.log("🌱 Inserting 8 Curated Landmarks...");
        const landmarks = [
            ["pin-oia", "oia", "oia_desc", "10 km", "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600", "https://www.visitgreece.gr", 36.4618, 25.3753, "heritage", now],
            ["pin-akrotiri", "akrotiri", "akrotiri_desc", "22 km", "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=600", "https://www.odysseus.culture.gr", 36.3514, 25.4029, "heritage", now],
            ["pin-pyrgos", "pyrgos", "pyrgos_desc", "7.5 km", "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=600", "https://www.visitgreece.gr", 36.3835, 25.4482, "heritage", now],
            ["pin-selene", "selene", "selene_desc", "8 km", "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600", "https://selene.gr", 36.3862, 25.4485, "dining", now],
            ["pin-amoudi", "amoudi", "amoudi_desc", "11 km", "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?q=80&w=600", "https://www.visitgreece.gr", 36.4594, 25.3692, "dining", now],
            ["pin-vlychada", "vlychada", "vlychada_desc", "19 km", "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600", "https://www.visitgreece.gr", 36.3394, 25.4322, "beach", now],
            ["pin-redbeach", "redbeach", "redbeach_desc", "23 km", "https://images.unsplash.com/photo-1560242375-73130d210515?q=80&w=600", "https://www.visitgreece.gr", 36.3481, 25.3948, "beach", now],
            ["pin-perivolos", "perivolos", "perivolos_desc", "17 km", "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=600", "https://www.visitgreece.gr", 36.3458, 25.4655, "beach", now]
        ];
        await connection.query(
            "INSERT INTO landmarks (slug, nameKey, descKey, distance, image, websiteUrl, lat, lng, category, updatedAt) VALUES ?",
            [landmarks]
        );

        console.log("🌱 Inserting Luxury Suites with unique rich image galleries...");
        const rooms = [
            [
                "caldera-grand-suite",
                "suite_caldera_title",
                "suite_caldera_desc",
                450.00, 2, 55,
                JSON.stringify(["amenity_pool", "amenity_wifi", "amenity_ac", "amenity_coffee"]),
                "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200",
                JSON.stringify([
                    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200", // 1. Caldera Pool
                    "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?q=80&w=800",  // 2. Bedroom View
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800"   // 3. Luxury Bathroom
                ]),
                "1", now
            ],
            [
                "aegean-infinity-suite",
                "suite_infinity_title",
                "suite_infinity_desc",
                650.00, 2, 70,
                JSON.stringify(["amenity_pool", "amenity_wifi", "amenity_ac", "amenity_parking"]),
                "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200",
                JSON.stringify([
                    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200", // 1. Infinity Pool Edge
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",  // 2. Minimal Lounge
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800"   // 3. Sea Sunset Terrace
                ]),
                "2", now
            ],
            [
                "honeymoon-sanctuary-suite",
                "suite_honeymoon_title",
                "suite_honeymoon_desc",
                850.00, 2, 85,
                JSON.stringify(["amenity_pool", "amenity_wifi", "amenity_ac", "amenity_tv"]),
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
                JSON.stringify([
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200", // 1. Cliffside Sanctuary
                    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800",  // 2. Outdoor Jacuzzi Detailing
                    "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800"   // 3. Pure White Interior
                ]),
                "3", now
            ],
            [
                "royal-aegean-villa",
                "suite_royal_title",
                "suite_royal_desc",
                1400.00, 4, 140,
                JSON.stringify(["amenity_pool", "amenity_wifi", "amenity_ac", "amenity_parking", "amenity_coffee"]),
                "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
                JSON.stringify([
                    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200", // 1. Grand Villa Exterior
                    "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=800",  // 2. Private Dining Area
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800"   // 3. Master Suite Bed
                ]),
                "4", now
            ]
        ];
        await connection.query(
            "INSERT INTO rooms (slug, nameKey, descKey, basePrice, maxGuests, sqMeters, amenities, mainImage, images, syncToken, updatedAt) VALUES ?",
            [rooms]
        );

        console.log("🌱 Inserting Premium Experiences matched with translation keys...");
        const experiences = [
            ["private-catamaran-sunset", "yachting", "yachting_desc", 250.00, "5 Hours", "https://images.unsplash.com/photo-1505080856163-267d49b30626?q=80&w=800", now],
            ["volcanic-wine-tasting", "wine", "wine_desc", 120.00, "3 Hours", "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800", now],
            ["helicopter-caldera-tour", "wellness", "wellness_desc", 600.00, "30 Mins", "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800", now]
        ];
        await connection.query(
            "INSERT INTO experiences (slug, nameKey, descKey, price, duration, mainImage, updatedAt) VALUES ?",
            [experiences]
        );

        console.log("✅ Native SQL Seeding Completed Successfully with Global Translation Keys!");
    } catch (error) {
        console.error("❌ SQL Error during seeding:", error);
    } finally {
        await connection.end();
    }
}

main();