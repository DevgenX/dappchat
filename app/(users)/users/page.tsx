import Users from "@/components/Users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DappChat | Users",
  description:
    "A multi-chain and fully on-chain decentralized messaging application",
};

const page = () => {
  return (
    <>
      <Users />
    </>
  );
};
export default page;
