"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { IconMapPin, IconPhone, IconArrowRight } from "./AegeanIcons";

export default function ContactSection() {
    const t = useTranslations("Contact");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: t('subject_general'), // Default value
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
        type: null,
        msg: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, msg: "" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus({
                    type: "error",
                    msg: data.error || "Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά."
                });
            } else {
                setStatus({
                    type: "success",
                    msg: "Το μήνυμά σας στάλθηκε με επιτυχία! Ευχαριστούμε."
                });
                setFormData({
                    name: "",
                    email: "",
                    subject: t('subject_general'),
                    message: ""
                });
            }
        } catch (err) {
            setStatus({ type: "error", msg: "Αποτυχία σύνδεσης με τον διακομιστή." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-white px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-stretch">
                    <div className="lg:w-1/2 flex flex-col">
                        <div className="mb-12">
                            <h2 className="text-4xl font-light tracking-tight text-aegean-deep uppercase mb-6">
                                {t('title')}
                            </h2>
                            <p className="text-aegean-deep/70 text-sm font-light max-w-md leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="p-3 border border-aegean-mist text-aegean-sky">
                                    <IconMapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">{t('location_label')}</h4>
                                    <p className="text-sm text-aegean-deep/70 font-light">{t('location_value')}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 border border-aegean-mist text-aegean-sky">
                                    <IconPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">{t('phone_label')}</h4>
                                    <p className="text-sm text-aegean-deep/70 font-light">+30 22860 12345</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow min-h-[350px] relative border border-aegean-mist overflow-hidden grayscale contrast-[1.1] brightness-[0.9]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12711.6054817812!2d25.421453!3d36.43167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1499cc7981a8f93d%3A0x400bdad115930!2sImerovigli%20847%2000!5e0!3m2!1sen!2sgr!4v1710000000000!5m2!1sen!2sgr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    <div className="lg:w-1/2 bg-aegean-white p-8 md:p-12 border border-aegean-mist">
                        {/* 5. ΔΙΟΡΘΩΣΗ: Προσθήκη του onSubmit handler */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">{t('name_label')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-light transition-colors rounded-none px-0"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">{t('email_label')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-light transition-colors rounded-none px-0"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">{t('subject_label')}</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-light transition-colors rounded-none px-0 appearance-none cursor-pointer"
                                >
                                    <option value={t('subject_general')}>{t('subject_general')}</option>
                                    <option value={t('subject_booking')}>{t('subject_booking')}</option>
                                    <option value={t('subject_event')}>{t('subject_event')}</option>
                                    <option value={t('subject_other')}>{t('subject_other')}</option>
                                </select>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">{t('message_label')}</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-light transition-colors rounded-none px-0 resize-none"
                                    placeholder={t('message_placeholder')}
                                ></textarea>
                            </div>

                            {/* 6. Feedback Messages UI */}
                            {status.type && (
                                <div className={`text-xs uppercase tracking-widest font-bold ${status.type === "success" ? "text-emerald-600" : "text-red-500"}`}>
                                    {status.msg}
                                </div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className={`w-full bg-aegean-deep text-white py-5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 group transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "SENDING..." : t('submit_button')}
                                {!loading && <IconArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}