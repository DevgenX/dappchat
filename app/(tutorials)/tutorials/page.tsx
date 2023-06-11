import Tutorials from "@/components/Tutorials";

type Metadata = {
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: "ChatDapp | Tutorials",
  description: "A multi-chain decentralized messaging application ",
};

const page = () => {
  return (
    <>
      <Tutorials />
    </>
  );
};
export default page;
