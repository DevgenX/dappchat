import Dashboard from "@/components/Dashboard";

type Metadata = {
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: "ChatDapp",
  description: "A multi-chain decentralized messaging application",
};

export default function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
