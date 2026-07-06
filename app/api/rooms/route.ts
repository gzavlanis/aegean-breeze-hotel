import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const rooms = await prisma.room.findMany({
            orderBy: { basePrice: "asc" },
        });

        const formattedRooms = rooms.map((room) => ({
            ...room,
            amenities: typeof room.amenities === "string" ? JSON.parse(room.amenities) : room.amenities,
            images: typeof room.images === "string" ? JSON.parse(room.images) : room.images,
        }));

        return NextResponse.json(formattedRooms, { status: 200 });
    } catch (error) {
        console.error("MySQL Fetch Error (Rooms):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}