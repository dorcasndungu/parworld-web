import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parworld Golf - Premium Golf Equipment",
  description: "Discover premium golf equipment from top brands. Elevate your game with our curated collection of golf clubs, balls, and accessories.",
  icons: {
    icon: '/parworld-logo.png',
    shortcut: '/parworld-logo.png',
    apple: '/parworld-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/parworld-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/parworld-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/parworld-logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
