import "./globals.css";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Toaster } from "@/components/common/Toast";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.className)}>
      <body className="min-h-screen bg-gray-100 dark:bg-slate-900 antialiased">
        <Providers>
          <Suspense>
            <Navbar />
            <Toaster position="top-right" />
            {children}
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
