import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/common/Toast";
import { Providers } from "@/components/Providers";
import Announcement from "@/components/Announcement";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 dark:bg-slate-900 antialiased">
        <Providers>
          <Announcement />
          <Navbar />
          <Toaster position="top-right" />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
