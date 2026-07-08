import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}