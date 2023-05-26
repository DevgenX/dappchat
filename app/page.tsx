import Metadata from "next";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";
import Image from "next/image";
import ChatDapp from "@/public/chatdapp.jpg";
import Features from "@/components/Features";
import Head from "next/head";

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
      <div className="h-screen screen flex flex-col md:flex-row justify-center items-center md:space-x-12">
        <div className="flex flex-col gap-4 mb-10">
          <Heading className="three-d text-black dark:text-white">
            Multi-chain <br /> decentralized <br /> messaging
          </Heading>
          <Paragraph className="max-w-md md:text-left ">
            Message anyone from the blockchain anonymously.{" "}
            <span className="font-bold">ChatDapp</span> is a decentralized
            protocol that allows wallet-to-wallet messaging powered by
            multi-chain interoperability.{" "}
            <Link
              href="/"
              className="underline underline-offset-2 text-black dark:text-light-gold"
            >
              Explore
            </Link>
          </Paragraph>
        </div>
        <div className="flex flex-col max-w-1xl md:max-w-5xl mx-10">
          <Image
            className="img-shadow rounded-xl"
            width={800}
            height={700}
            src={ChatDapp}
            alt="Decentralized-Messaging"
          />
        </div>
      </div>
      <Heading className="flex justify-center mb-3">Features</Heading>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Features />
      </div>
    </>
  );
}
