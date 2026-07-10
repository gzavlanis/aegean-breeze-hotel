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
        const body = await req.json();
        const updateData: any = {};
        if (body.status) updateData.status = body.status;
        if (body.customerName) updateData.customerName = body.customerName;
        if (body.customerEmail) updateData.customerEmail = body.customerEmail;
        if (body.totalPrice !== undefined) updateData.totalPrice = Number(body.totalPrice);
        if (body.checkIn) updateData.checkIn = new Date(body.checkIn);
        if (body.checkOut) updateData.checkOut = new Date(body.checkOut);
        if (body.roomId) updateData.roomId = Number(body.roomId);

        const updatedBooking = await prisma.booking.update({
            where: { id: Number(id) },
            data: updateData
        });

        return NextResponse.json({ success: true, data: updatedBooking });
    } catch (error) {
        console.error("Booking patch error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}