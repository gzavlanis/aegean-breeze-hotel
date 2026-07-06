import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const roomId = Number(params.id);

        const bookings = await prisma.booking.findMany({
            where: {
                roomId: roomId,
                status: { not: "CANCELLED" },
            },
            select: {
                checkIn: true,
                checkOut: true,
            },
        });

        const bookedDates: string[] = [];
        bookings.forEach((booking) => {
            const current = new Date(booking.checkIn);
            const end = new Date(booking.checkOut);

            while (current <= end) {
                bookedDates.push(current.toISOString().split("T")[0]);
                current.setDate(current.getDate() + 1);
            }
        });

        const uniqueBookedDates = Array.from(new Set(bookedDates));

        return NextResponse.json(uniqueBookedDates, { status: 200 });
    } catch (error) {
        console.error("Error fetching booked dates:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}