// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ⬇️ Import components
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My App",
  description: "Using Clerk for authentication",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Full layout: Sidebar + Navbar */}
          <div className="flex h-screen">
            <Sidebar /> {/* ✅ Sidebar stays on left */}
            <div className="flex flex-col flex-1">
              <Navbar /> {/* ✅ Navbar on top */}
              <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
