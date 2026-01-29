import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { twJoin } from "tailwind-merge";
import "./globals.css";

const baseUrl = "https://www.mauriciorobayo.com";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mauricio Robayo",
    template: "%s | Mauricio Robayo",
  },
  description: "Mauricio Robayo.",
  openGraph: {
    title: "Mauricio Robayo",
    description: "Mauricio Robayo.",
    url: baseUrl,
    siteName: "Mauricio Robayo",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={twJoin(
        geist.variable,
        geistMono.variable,
        "antialiased font-sans bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400",
      )}
    >
      <body>{children}</body>
    </html>
  );
}
