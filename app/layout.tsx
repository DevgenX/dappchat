"use client";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen dark:bg-slate-900 antialiased">
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
