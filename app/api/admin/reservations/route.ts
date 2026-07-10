import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { roomId, customerName, customerEmail, checkIn, checkOut, totalPrice, status } = body;

        const hasOverlap = await prisma.booking.findFirst({
            where: {
                roomId: Number(roomId),
                status: { not: "CANCELLED" },
                OR: [
                    { checkIn: { lte: new Date(checkOut) }, checkOut: { gte: new Date(checkIn) } }
                ]
            }
        });

        if (hasOverlap) {
            return NextResponse.json({ error: "Room is already booked for these dates." }, { status: 400 });
        }

        const newBooking = await prisma.booking.create({
            data: {
                roomId: Number(roomId),
                customerName,
                customerEmail,
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                totalPrice: Number(totalPrice),
                status: status || "CONFIRMED"
            }
        });

        return NextResponse.json({ success: true, data: newBooking });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = req.nextUrl;
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await prisma.booking.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}