// app/layout.tsx or app/layout.js
import type { Metadata } from "next";
import {
  Nunito,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// ✅ Nunito as default font
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: 'Your Beauty Academy | Hair, Makeup, Spa & More',
  description: 'Offering certified training and professional services in hair, makeup, facials, spa, pedicure, manicure, and more.',
  keywords: 'beauty academy, hair training, makeup course, spa services, facial, pedicure, manicure, salon training',
  authors: [{ name: 'Your Brand Name', url: '/favicon.png' }],
  openGraph: {
    title: 'Your Beauty Academy',
    description: 'Learn & experience premium beauty training and services.',
    url: '/favicon.png',
    siteName: 'Your Beauty Academy',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Your Beauty Academy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Beauty Academy',
    description: 'Learn & experience premium beauty training and services.',
    site: '@yourtwitter',
    images: ['/favicon.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${instrumentSerif.variable}`}>
      <body className="font-nunito antialiased">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
