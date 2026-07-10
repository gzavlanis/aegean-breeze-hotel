import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url, pathname, referrer, device } = body;
        const country = req.headers.get("x-vercel-ip-country") || "GR";

        let cleanReferrer = "Direct";
        if (referrer && referrer !== "Direct") {
            const refUrl = new URL(referrer);
            if (refUrl.hostname.includes("google")) cleanReferrer = "Google Search (SEO)";
            else if (refUrl.hostname.includes("instagram") || refUrl.hostname.includes("t.co")) cleanReferrer = "Instagram / Social";
            else if (refUrl.hostname.includes("booking.com")) cleanReferrer = "Booking.com Referral";
            else cleanReferrer = refUrl.hostname; // Κρατάει το domain
        }

        const view = await prisma.pageView.create({
            data: {
                url,
                pathname,
                referrer: cleanReferrer,
                device,
                country
            }
        });

        return NextResponse.json({ success: true, id: view.id });
    } catch (error) {
        return NextResponse.json({ error: "Failed to log view" }, { status: 500 });
    }
}