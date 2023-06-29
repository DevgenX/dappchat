import Dashboard from "@/components/Dashboard";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "DappChat",
  description:
    "A multi-chain and fully on-chain decentralized messaging application",
};

export default function Home() {
  return (
    <main>
      <Suspense>
        <Dashboard />
      </Suspense>
    </main>
  );
}
