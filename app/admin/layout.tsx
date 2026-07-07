import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function AdminLayout({children,}: {
    children: React.ReactNode;
}) {
    const messages = await getMessages({ locale: "en" });

    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <div className="min-h-screen bg-slate-50/50 antialiased selection:bg-aegean-sky selection:text-white">
                {children}
            </div>
        </NextIntlClientProvider>
    );
}