import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TansTackProvider } from "@/components";
import { ComponentAds } from "@/components/ads/ComponentAds";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiniela-Contra",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="ppck-ver" content="e53f623e73177d465a4d4d40810480b6" />
      </head>
      <body className={`${inter.className} bg-slate-900`}>
        <main className="">
          <TansTackProvider>{children}</TansTackProvider>
          <ComponentAds />
        </main>
      </body>
    </html>
  );
}
