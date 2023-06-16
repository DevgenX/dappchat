import Chats from "@/components/Chats";

type Metadata = {
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: "DappChat | Chat",
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
