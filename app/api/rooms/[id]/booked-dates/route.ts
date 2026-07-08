import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const roomId = Number(id);

        if (isNaN(roomId)) {
            return NextResponse.json({ error: "Invalid Room ID" }, { status: 400 });
        }

        const bookings = await prisma.booking.findMany({
            where: {
                roomId: roomId,
                status: {
                    not: "CANCELLED",
                },
            },
            select: {
                checkIn: true,
                checkOut: true,
            },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error fetching booked dates:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}