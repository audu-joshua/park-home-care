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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.packhomehealthcareagency.com"),
  title: "Pack Home Health Care Agency LLC | Compassionate Care. Like Family.",
  description:
    "At Pack Home Health Care Agency LLC, we provide personalized in-home care that helps your loved ones live safely, comfortably, and independently.",
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Pack Home Health Care Agency LLC | Compassionate Care. Like Family.",
    description:
      "At Pack Home Health Care Agency LLC, we provide personalized in-home care that helps your loved ones live safely, comfortably, and independently.",
    url: "https://www.packhomehealthcareagency.com",
    siteName: "Pack Home Health Care Agency LLC",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Pack Home Health Care Agency LLC Logo",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pack Home Health Care Agency LLC | Compassionate Care. Like Family.",
    description:
      "At Pack Home Health Care Agency LLC, we provide personalized in-home care that helps your loved ones live safely, comfortably, and independently.",
    images: ["/icon-512x512.png"],
  },
};

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
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 overflow-x-hidden">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
