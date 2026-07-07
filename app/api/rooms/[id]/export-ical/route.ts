import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ical from "ical-generator";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");
        const roomId = Number(params.id);
        const room = await prisma.room.findUnique({ where: { id: roomId } });

        if (!room || room.syncToken !== token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const bookings = await prisma.booking.findMany({
            where: { roomId, status: { not: "CANCELLED" } }
        });

        const calendar = ical({ name: `Aegean Luxury Suites - ${room.slug}` });

        bookings.forEach((booking) => {
            calendar.createEvent({
                start: new Date(booking.checkIn),
                end: new Date(booking.checkOut),
                summary: "Direct Booking / Blocked",
                description: `Booking ID: ${booking.id}`,
            });
        });

        return new NextResponse(calendar.toString(), {
            headers: {
                "Content-Type": "text/calendar; charset=utf-8",
                "Content-Disposition": `attachment; filename="room-${roomId}.ics"`,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server error" }, { status: 500 });
    }
}