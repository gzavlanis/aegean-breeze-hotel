import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                room: {
                    select: {
                        nameKey: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        console.error("Admin Fetch Bookings Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// 2. PATCH
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { bookingId, status } = body;

        if (!bookingId || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid status type" }, { status: 400 });
        }

        const updatedBooking = await prisma.booking.update({
            where: {
                id: Number(bookingId),
            },
            data: {
                status: status,
            },
        });

        return NextResponse.json({ success: true, booking: updatedBooking }, { status: 200 });
    } catch (error) {
        console.error("Admin Update Booking Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}