import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aaron Eisler | Technology Executive",
  description: "COO, CTO, Chief AI Officer - 25+ years driving operational excellence and digital transformation across enterprise technology.",
  openGraph: {
    title: "Aaron Eisler | Technology Executive",
    description: "COO, CTO, Chief AI Officer - 25+ years driving operational excellence and digital transformation.",
    type: "website",
    url: "https://aaroneisler.com.au",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
