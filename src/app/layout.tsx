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
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for text rendering */
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Force text rendering on problematic devices */
            @media screen and (-webkit-min-device-pixel-ratio: 0) {
              body, p, h1, h2, h3, h4, h5, h6, span, div {
                -webkit-text-stroke: 0.01em transparent;
              }
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
