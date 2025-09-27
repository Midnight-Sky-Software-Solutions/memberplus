import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MemberPlus",
  description: "Manage memberships your way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-[100vh]`}
        >
          {children}
        </body>
      </PrimeReactProvider>
    </html>
  );
}
