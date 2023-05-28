"use client";

import { ThemeProvider } from "next-themes";
import { ChatProvider } from "@/context/ChatDapp.context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChatProvider>{children}</ChatProvider>
    </ThemeProvider>
  );
}
