import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const { status } = await req.json();

        if (!status) return NextResponse.json({ error: "Missing status" }, { status: 400 });

        const updatedBooking = await prisma.booking.update({
            where: { id: Number(id) },
            data: { status }
        });

        return NextResponse.json({ success: true, data: updatedBooking });
    } catch (error) {
        console.error("Booking update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}