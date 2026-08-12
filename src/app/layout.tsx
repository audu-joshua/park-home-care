import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Park Home Health | Compassionate Care. Like Family.",
  description:
    "At Park Home Health Agency LLC, we provide personalized in-home care that helps your loved ones live safely, comfortably, and independently.",
  icons: {
    icon: [
      { url: "/images/Icon 1.webp", type: "image/webp" },
    ],
    apple: "/images/Icon 1.webp",
  },
  openGraph: {
    title: "Park Home Health | Compassionate Care. Like Family.",
    description:
      "At Park Home Health Agency LLC, we provide personalized in-home care that helps your loved ones live safely, comfortably, and independently.",
    url: "/",
    siteName: "Park Home Health",
    images: [
      {
        url: "/images/Icon 1.webp",
        width: 1200,
        height: 630,
        alt: "Park Home Health logo",
        type: "image/webp",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Park Home Health | Compassionate Care. Like Family.",
    description:
      "At Park Home Health Agency LLC, we provide personalized in-home care that helps your loved ones live safely, comfortably, and independently.",
    images: ["/images/Icon 1.webp"],
  },
};

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/images/Icon 1.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/images/Icon 1.webp" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 overflow-x-hidden">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
