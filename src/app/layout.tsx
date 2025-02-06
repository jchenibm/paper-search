import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  display: 'swap', // Add this line
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: 'swap', // Add this line
});

export const metadata: Metadata = {
  title: "Paper Search System",
  description: "Search and explore academic papers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
