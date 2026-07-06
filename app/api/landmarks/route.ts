import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const landmarks = await prisma.landmark.findMany({
            orderBy: { id: "asc" },
        });

        return NextResponse.json(landmarks, { status: 200 });
    } catch (error) {
        console.error("MySQL Fetch Error (Landmarks):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}