import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
        <link rel="icon" href="/images/Icon 1.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/images/Icon 1.webp" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
