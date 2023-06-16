import Tutorials from "@/components/Tutorials";

type Metadata = {
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: "DappChat | Tutorials",
  description:
    "A multi-chain and fully on-chain decentralized messaging application",
};

const page = () => {
  return (
    <>
      <Tutorials />
    </>
  );
};
export default page;
