import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import React from "react";
import TrafficTracker from "@/components/analytics/TrafficTracker";

export default async function RootLayout({ children, params }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
        <TrafficTracker/>
        </body>
        </html>
    );
}