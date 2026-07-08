import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { roomId, checkIn, checkOut, reason } = body;

        if (!roomId || !checkIn || !checkOut) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const existingBooking = await prisma.booking.findFirst({
            where: {
                roomId: Number(roomId),
                status: { not: "CANCELLED" },
                OR: [
                    { checkIn: { lte: endDate }, checkOut: { gte: startDate } }
                ]
            }
        });

        if (existingBooking) {
            return NextResponse.json({
                error: "This room is already reserved or blocked during these dates."
            }, { status: 400 });
        }

        const blockEntry = await prisma.booking.create({
            data: {
                roomId: Number(roomId),
                customerName: `INTERNAL_BLOCK: ${reason || "Maintenance"}`,
                customerEmail: "admin@resort.com",
                checkIn: startDate,
                checkOut: endDate,
                totalPrice: 0.00,
                status: "CONFIRMED"
            }
        });

        return NextResponse.json({ success: true, data: blockEntry });
    } catch (error) {
        console.error("Error creating room block:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}