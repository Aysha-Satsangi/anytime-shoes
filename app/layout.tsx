import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anytime-shoes.vercel.app"), // replace with your actual domain
  title: {
    default: "Anytime | Premium Leather Shoes",
    template: "%s | Anytime",
  },
  description:
    "Anytime crafts premium authentic leather shoes for everyday elegance. Shop formal shoes, loafers, and sneakers — built to last, designed to impress.",
  keywords: [
    "leather shoes",
    "premium leather shoes",
    "formal shoes India",
    "leather loafers",
    "handcrafted shoes",
    "Anytime shoes",
  ],
  openGraph: {
    type: "website",
    siteName: "Anytime",
    title: "Anytime | Premium Leather Shoes",
    description:
      "Premium authentic leather shoes crafted to last. Shop the Anytime collection.",
    images: [
      {
        url: "/og-image.jpg", // add a 1200×630 brand image to /public
        width: 1200,
        height: 630,
        alt: "Anytime — Premium Leather Shoes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anytime | Premium Leather Shoes",
    description:
      "Premium authentic leather shoes crafted to last. Shop the Anytime collection.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${poppins.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
