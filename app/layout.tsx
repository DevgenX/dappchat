import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/Toast";
import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 dark:bg-slate-900 antialiased">
        <Providers>
          <Navbar />
          <Toaster position="bottom-right" />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
