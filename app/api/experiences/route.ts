// app/api/experiences/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { id: "asc" },
        });

        return NextResponse.json(experiences, { status: 200 });
    } catch (error) {
        console.error("MySQL Fetch Error (Experiences):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}