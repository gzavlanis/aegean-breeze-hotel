import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialConcierge from '@/components/SocialConcierge';
import "../globals.css";
import React from "react";

export default async function LocaleLayout({ children, params }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <SocialConcierge />
        </NextIntlClientProvider>
        </body>
        </html>
    );
}