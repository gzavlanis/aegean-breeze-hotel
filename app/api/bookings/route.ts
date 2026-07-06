import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { roomId, customerName, customerEmail, checkIn, checkOut } = body;

        if (!roomId || !customerName || !customerEmail || !checkIn || !checkOut) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        if (checkInDate >= checkOutDate) {
            return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
        }

        const room = await prisma.room.findUnique({
            where: { id: Number(roomId) },
        });

        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        const conflictingBooking = await prisma.booking.findFirst({
            where: {
                roomId: Number(roomId),
                status: { not: "CANCELLED" },
                AND: [
                    {
                        checkIn: { lt: checkOutDate },
                    },
                    {
                        checkOut: { gt: checkInDate },
                    },
                ],
            },
        });

        if (conflictingBooking) {
            return NextResponse.json(
                { error: "The room is already booked for these dates" },
                { status: 400 }
            );
        }

        const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        const totalPrice = Number(room.basePrice) * nights;
        const newBooking = await prisma.booking.create({
            data: {
                roomId: Number(roomId),
                customerName,
                customerEmail,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                totalPrice,
                status: "PENDING",
            },
        });

        return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error("MySQL Booking Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}