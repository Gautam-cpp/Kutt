import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Appbar } from "@/components/appbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kutt",
  description: "Free modern URL shortner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        
        
        <div className=" flex w-full items-center flex-col flex-grow-0 flex-shrink-0 basis-auto">
        <Appbar></Appbar>
        </div>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
