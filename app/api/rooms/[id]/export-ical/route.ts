import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ical from "ical-generator";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: Request,
    { params }: RouteParams
) {
    try {
        const { id } = await params;
        const roomId = Number(id);

        if (isNaN(roomId)) {
            return NextResponse.json({ error: "Invalid Room ID" }, { status: 400 });
        }

        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");
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
        console.error("iCal Export Error:", error);
        return NextResponse.json({ error: "Internal Server error" }, { status: 500 });
    }
}