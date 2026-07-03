import { cn } from "@/lib/utils";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

const svgProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
};

export const IconArrowRight = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M3 12H21M21 12L14 5M21 12L14 19" />
    </svg>
);

export const IconArrowLeft = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M21 12H3M3 12L10 5M3 12L10 19" />
    </svg>
);

export const IconChevronDown = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M5 9L12 16L19 9" />
    </svg>
);

export const IconMenu = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M3 6H21M3 12H21M3 18H21" />
    </svg>
);

export const IconClose = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M5 5L19 19M19 5L5 19" />
    </svg>
);

export const IconGlobe = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M2 12L12 2L22 12L12 22Z" />
        <path d="M12 2V22M2 12H22M7 7L17 17M17 7L7 17" />
    </svg>
);

export const IconMapPin = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M12 22L6 10V4H18V10L12 22Z" />
        <path d="M10 6H14V8H10Z" />
    </svg>
);

export const IconPhone = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M5 2H19V22H5V2Z M10 18H14" />
    </svg>
);

export const IconInstagram = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M4 4H20V20H4V4Z" />
        <path d="M9 9H15V15H9V9Z" />
        <path d="M16 6H17V7H16V6Z" />
    </svg>
);

export const IconFacebook = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M15 4H10V20M10 10H15" />
    </svg>
);

export const IconX = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M4 4L20 20M20 4L4 20" />
    </svg>
);

export const IconGuests = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M9 8V4H15V8H9ZM5 20V10H19V20H5ZM9 10V8M15 10V8" />
    </svg>
);

export const IconSquareMeters = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M3 3H21V21H3V3Z" />
        <path d="M3 9H21M3 15H21M9 3V21M15 3V21" />
    </svg>
);

export const IconBed = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M2 18V6H4V18H2ZM4 10H22V12H4V10ZM6 10V8H12V10M14 10V8H20V10M20 18H22V12H20V18Z" />
    </svg>
);

// --- AMENITIES ---

export const IconWifi = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M12 20H12.01" strokeWidth="2"/>
        <path d="M8 16L12 12L16 16M5 13L12 6L19 13M2 10L12 0L22 10" />
    </svg>
);

export const IconAC = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M3 5H21V11H3V5ZM6 11V14M12 11V16M18 11V14M8 19H16M10 22H14" />
    </svg>
);

export const IconPool = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M2 14V22H22V14M2 14L5 11L8 14L11 11L14 14L17 11L20 14L22 12M6 8V2M10 8V4" />
    </svg>
);

export const IconCoffee = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M4 8H16V18H4V8ZM16 10H20V14H16M8 3V5M12 3V5" />
    </svg>
);

export const IconTV = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M3 7H21V19H3V7ZM8 2L12 7L16 2" />
    </svg>
);

export const IconCar = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M3 12H21V16H3V12ZM5 12V8H15L19 12M6 16V19H9V16M15 16V19H18V16" />
    </svg>
);

export const IconQuote = ({ className, ...props }: IconProps) => (
    <svg className={cn("w-5 h-5", className)} {...svgProps} {...props}>
        <path d="M3 6V18H9V12H6V6H3Z" />
        <path d="M15 6V18H21V12H18V6H15Z" />
    </svg>
);

// --- FLAGS (Minimal SVG) ---

export const IconFlagEN = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 27 18" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="27" height="18" fill="#012169" />
        <path d="M0,0 L27,18 M27,0 L0,18" stroke="#fff" strokeWidth="3" />
        <path d="M0,0 L27,18 M27,0 L0,18" stroke="#C8102E" strokeWidth="1.5" />
        <path d="M13.5,0 L13.5,18 M0,9 L27,9" stroke="#fff" strokeWidth="5" />
        <path d="M13.5,0 L13.5,18 M0,9 L27,9" stroke="#C8102E" strokeWidth="3" />
    </svg>
);

export const IconFlagEL = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 27 18" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="27" height="18" fill="#0D5EAF" />
        <path d="M0,3 L27,3 M0,7 L27,7 M0,11 L27,11 M0,15 L27,15" stroke="#fff" strokeWidth="2" />
        <rect width="10" height="10" fill="#0D5EAF" />
        <path d="M5,0 L5,10 M0,5 L10,5" stroke="#fff" strokeWidth="2" />
    </svg>
);

export const IconFlagFR = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 27 18" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="9" height="18" fill="#002395" />
        <rect width="9" height="18" x="9" fill="#fff" />
        <rect width="9" height="18" x="18" fill="#ED2939" />
    </svg>
);

export const IconFlagDE = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 27 18" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="27" height="6" fill="#000" />
        <rect width="27" height="6" y="6" fill="#D00" />
        <rect width="27" height="6" y="12" fill="#FFCE00" />
    </svg>
);

export const IconFlagIT = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 27 18" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="9" height="18" fill="#008C45" />
        <rect width="9" height="18" x="9" fill="#fff" />
        <rect width="9" height="18" x="18" fill="#CD212A" />
    </svg>
);

export const IconFlagES = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 27 18" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="27" height="4.5" fill="#AA151B" />
        <rect width="27" height="9" y="4.5" fill="#F1BF00" />
        <rect width="27" height="4.5" y="13.5" fill="#AA151B" />
    </svg>
);