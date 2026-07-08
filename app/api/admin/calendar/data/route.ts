import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = req.nextUrl;
        const year = parseInt(searchParams.get("year") || "2026");
        const month = parseInt(searchParams.get("month") || "7"); // Fallback july 2026
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59);

        const roomsData = await prisma.room.findMany({
            select: {
                id: true,
                slug: true,
                basePrice: true,
                bookings: {
                    where: {
                        status: { not: "CANCELLED" },
                        AND: [
                            { checkIn: { lte: endOfMonth } },
                            { checkOut: { gte: startOfMonth } }
                        ]
                    },
                    select: {
                        id: true,
                        customerName: true,
                        customerEmail: true,
                        checkIn: true,
                        checkOut: true,
                        status: true,
                        totalPrice: true
                    }
                }
            }
        });

        return NextResponse.json({ rooms: roomsData });
    } catch (error) {
        console.error("Calendar data error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}