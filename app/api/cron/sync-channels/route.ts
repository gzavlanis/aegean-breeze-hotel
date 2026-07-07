import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodeIcal from "node-ical";

export async function GET() {
    try {
        const rooms = await prisma.room.findMany({
            where: { icalFeedUrl: { not: null } }
        });

        for (const room of rooms) {
            if (!room.icalFeedUrl) continue;

            const webEvents = await nodeIcal.fromURL(room.icalFeedUrl);

            for (const k in webEvents) {
                if (webEvents[k].type !== 'VEVENT') continue;

                const event = webEvents[k] as any;
                const checkIn = new Date(event.start);
                const checkOut = new Date(event.end);
                const existing = await prisma.booking.findFirst({
                    where: {
                        roomId: room.id,
                        checkIn: checkIn,
                        checkOut: checkOut,
                    }
                });

                if (!existing) {
                    await prisma.booking.create({
                        data: {
                            roomId: room.id,
                            customerName: event.summary || "External Channel Booking",
                            customerEmail: "channel-sync@internal.com",
                            checkIn,
                            checkOut,
                            totalPrice: 0.00,
                            status: "CONFIRMED",
                        }
                    });
                }
            }
        }

        return NextResponse.json({ success: true, message: "Channels synchronized successfully." });
    } catch (error) {
        console.error("Channel sync failed:", error);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}