import Dashboard from "@/components/Dashboard";
import Announcement from "@/components/common/Announcement";

type Metadata = {
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: "DappChat",
  description:
    "A multi-chain and fully on-chain decentralized messaging application",
};

export default function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
