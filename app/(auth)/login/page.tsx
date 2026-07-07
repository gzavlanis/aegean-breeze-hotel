"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Μη έγκυρα στοιχεία πρόσβασης.");
            setLoading(false);
        } else {
            router.push("/admin/dashboard");
        }
    };

    return (
        <main className="min-h-screen bg-aegean-deep flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-white p-8 md:p-12 border border-aegean-mist/30 shadow-2xl">
                <div className="text-center mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aegean-sky block mb-2">
            MANAGEMENT SYSTEM
          </span>
                    <h1 className="text-2xl font-light text-aegean-deep uppercase tracking-tight">
                        ADMIN LOGIN
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">
                            EMAIL ADDRESS
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-light text-aegean-deep rounded-none px-0"
                            placeholder="admin@resort.com"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-light text-aegean-deep rounded-none px-0"
                        />
                    </div>

                    {error && <p className="text-xs font-bold text-red-500 uppercase tracking-wider">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-aegean-deep hover:bg-aegean-sky text-white py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors rounded-none"
                    >
                        {loading ? "AUTHENTICATING..." : "ENTER DASHBOARD"}
                    </button>
                </form>
            </div>
        </main>
    );
}