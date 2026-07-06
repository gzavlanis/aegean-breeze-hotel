"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { IconArrowRight, IconTemple, IconCloche, IconUmbrella } from "@/components/AegeanIcons";

import "leaflet/dist/leaflet.css";

interface MapPinItem {
    id: string;
    nameKey: string;
    descKey: string;
    distance: string;
    image: string;
    websiteUrl: string;
    position: [number, number];
    category: "heritage" | "dining" | "beach";
}

const mapPinsData: MapPinItem[] = [
    {
        id: "pin-oia",
        nameKey: "oia",
        descKey: "oia_desc",
        distance: "10 km",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600",
        websiteUrl: "https://www.visitgreece.gr",
        position: [36.4618, 25.3753],
        category: "heritage"
    },
    {
        id: "pin-akrotiri",
        nameKey: "akrotiri",
        descKey: "akrotiri_desc",
        distance: "22 km",
        image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=600",
        websiteUrl: "https://www.odysseus.culture.gr",
        position: [36.3514, 25.4029],
        category: "heritage"
    },
    {
        id: "pin-pyrgos",
        nameKey: "pyrgos",
        descKey: "pyrgos_desc",
        distance: "7.5 km",
        image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=600",
        websiteUrl: "https://www.visitgreece.gr",
        position: [36.3835, 25.4482],
        category: "heritage"
    },
    {
        id: "pin-selene",
        nameKey: "selene",
        descKey: "selene_desc",
        distance: "8 km",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
        websiteUrl: "https://selene.gr",
        position: [36.3862, 25.4485],
        category: "dining"
    },
    {
        id: "pin-amoudi",
        nameKey: "amoudi",
        descKey: "amoudi_desc",
        distance: "11 km",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?q=80&w=600",
        websiteUrl: "https://www.visitgreece.gr",
        position: [36.4594, 25.3692],
        category: "dining"
    },
    {
        id: "pin-vlychada",
        nameKey: "vlychada",
        descKey: "vlychada_desc",
        distance: "19 km",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600",
        websiteUrl: "https://www.visitgreece.gr",
        position: [36.3394, 25.4322],
        category: "beach"
    },
    {
        id: "pin-redbeach",
        nameKey: "redbeach",
        descKey: "redbeach_desc",
        distance: "23 km",
        image: "https://images.unsplash.com/photo-1560242375-73130d210515?q=80&w=600",
        websiteUrl: "https://www.visitgreece.gr",
        position: [36.3481, 25.3948],
        category: "beach"
    },
    {
        id: "pin-perivolos",
        nameKey: "perivolos",
        descKey: "perivolos_desc",
        distance: "17 km",
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=600",
        websiteUrl: "https://www.visitgreece.gr",
        position: [36.3458, 25.4655],
        category: "beach"
    }
];

export default function CustomBespokeMap() {
    const t = useTranslations("Explore");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getLeafletIcon = (category: "heritage" | "dining" | "beach") => {
        let iconHtml = "";

        if (category === "dining") {
            iconHtml = renderToString(
                <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full border border-red-200 shadow-md text-red-500 hover:scale-110 transition-all duration-200">
                    <IconCloche className="w-4 h-4 text-red-500" />
                </div>
            );
        } else if (category === "beach") {
            iconHtml = renderToString(
                <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full border border-emerald-200 shadow-md text-emerald-600 hover:scale-110 transition-all duration-200">
                    <IconUmbrella className="w-4 h-4 text-emerald-600" />
                </div>
            );
        } else {
            iconHtml = renderToString(
                <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full border border-blue-200 shadow-md text-blue-600 hover:scale-110 transition-all duration-200">
                    <IconTemple className="w-4 h-4 text-blue-600" />
                </div>
            );
        }

        return L.divIcon({
            html: iconHtml,
            className: "custom-leaflet-marker",
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            popupAnchor: [0, -18]
        });
    };

    if (!mounted) return null;

    return (
        <div className="w-full h-full min-h-[500px] lg:min-h-[600px] border border-aegean-mist relative z-10">
            <MapContainer
                center={[36.4100, 25.4300]}
                zoom={11}
                style={{ width: "100%", height: "100%", minHeight: "500px" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />

                {mapPinsData.map((pin) => (
                    <Marker key={pin.id} position={pin.position} icon={getLeafletIcon(pin.category)}>
                        <Popup>
                            <div className="flex flex-col gap-2 p-1 max-w-[240px]">
                                <h4 className="text-xs font-bold text-aegean-deep uppercase tracking-wide m-0">{t(pin.nameKey)}</h4>
                                <span className="text-[9px] text-aegean-sky font-bold uppercase tracking-widest block">{t("distance")}: {pin.distance}</span>
                                <img src={pin.image} alt={t(pin.nameKey)} className="w-full h-20 object-cover my-1 border border-aegean-mist/30" />
                                <p className="text-[10px] text-aegean-deep/80 font-light leading-relaxed m-0">{t(pin.descKey)}</p>
                                <a href={pin.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-aegean-deep hover:text-aegean-sky border-t border-aegean-mist/40 pt-2 mt-1 no-underline">
                                    <span>{t("visit_website")}</span>
                                    <IconArrowRight className="w-3 h-3" />
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}