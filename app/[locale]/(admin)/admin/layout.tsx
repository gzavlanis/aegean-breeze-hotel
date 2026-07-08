import React from "react";

export default function AdminZoneLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-neutral-100 text-neutral-900">
            {children}
        </div>
    );
}