import Metadata from "next";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";
import Image from "next/image";
import ChatDapp from "@/public/chatdapp.jpg";
import Features from "@/components/Features";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

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
    <>
      <div className="home h-screen screen flex flex-col md:flex-row justify-center items-center md:space-y-12 md:space-x-[12]">
        <div className="flex flex-col gap-4 mb-10">
          <Heading className="three-d text-white dark:text-white">
            Multi-chain <br /> decentralized <br /> messaging
          </Heading>
          <Paragraph className="max-w-md md:text-left ">
            Message anyone from the blockchain anonymously.{" "}
            <span className="font-bold text-light-gold">ChatDapp</span> is a
            decentralized protocol that allows wallet-to-wallet messaging
            powered by multi-chain interoperability.{" "}
            <Link
              href="/"
              className="underline underline-offset-2 text-slate-100"
            >
              Explore{" "}
              <BsFillArrowUpRightCircleFill
                size={30}
                className="hover:-translate-y-1 transition-transform cursor-pointer inline-block"
              />
            </Link>
          </Paragraph>
        </div>
        <div className="flex flex-row max-w-1xl md:max-w-5xl mx-10">
          <Image
            className="img-shadow rounded-xl"
            width={800}
            height={700}
            src={ChatDapp}
            alt="Decentralized-Messaging"
          />
        </div>
      </div>
      <Heading className="flex justify-center my-5">Features</Heading>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Features />
      </div>
    </>
  );
}
