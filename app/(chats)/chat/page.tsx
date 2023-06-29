import Chats from "@/components/Chats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DappChat | Chats",
  description:
    "A multi-chain and fully on-chain decentralized messaging application",
};

const page = () => {
  return (
    <div className="mx-auto mt-16">
      <Chats />
    </div>
  );
};
export default page;
