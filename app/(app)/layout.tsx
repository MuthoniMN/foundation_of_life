import type { Metadata } from "next";
import { Fraunces, Quicksand } from "next/font/google";
import "./globals.css";
import "./styles.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const nunito = Quicksand({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chariots of Destiny Children's Center — A home, a school, a future",
  description: "Chariots of Destiny Children's Center is a church-founded children's home and school. Donate, sponsor, and follow exactly how every gift is used.",
  metadataBase: new URL("https://chariotsofdestiny.org"),
  openGraph: {
    title: "Chariots of Destiny Children's Center — A home, a school, a future",
    description: "A loving home and full education for children who need it most.",
    type: "website",
    images: [
      {
        url: "/assets/hero-children.jpg",
        width: 1200,
        height: 630,
        alt: "Chariots of Destiny Children's Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chariots of Destiny Children's Center — A home, a school, a future",
    description: "A loving home and full education for children who need it most.",
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
      className={`${fraunces.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">{children}</body>
    </html>
  );
}
