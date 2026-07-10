"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TrafficTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Εξαιρούμε τα admin routes από την καταγραφή της επισκεψιμότητας των πελατών
        if (pathname.includes("/admin") || pathname.includes("/api/")) return;

        const trackView = async () => {
            try {
                // Ανίχνευση συσκευής (Mobile/Tablet/Desktop)
                const ua = navigator.userAgent;
                let device = "Desktop";
                if (/tablet|ipad|playbook|silk/i.test(ua.toLowerCase())) {
                    device = "Tablet";
                } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) {
                    device = "Mobile";
                }

                const fullUrl = window.location.href;
                const referrer = document.referrer || "Direct";

                await fetch("/api/analytics/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: fullUrl,
                        pathname: pathname,
                        referrer: referrer,
                        device: device
                    }),
                    keepalive: true // Εξασφαλίζει ότι το request θα φύγει ακόμα κι αν ο χρήστης κλείσει γρήγορα τη σελίδα
                });
            } catch (err) {
                console.error("Analytics tracking failed", err);
            }
        };

        trackView();
    }, [pathname, searchParams]);

    return null; // Δεν κάνει render τίποτα στην οθόνη
}