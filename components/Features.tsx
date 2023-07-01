import React, { FC } from "react";

import { BsLock } from "react-icons/bs";
import { GiChaingun } from "react-icons/gi";
import { MdOutlineBlock } from "react-icons/md";
import { FaUserSecret, FaUserFriends, FaPaperPlane } from "react-icons/fa";

import { FeaturesProps } from "@/types/types";
import FeaturesCard from "@/components/ui/FeaturesCard";

const features: FeaturesProps[] = [
  {
    title: "Decentralized",
    desc: "Experience true decentralization with wallet-to-wallet communication on the blockchain.",
    icon: FaUserSecret,
  },
  {
    title: "Add Friends",
    desc: "Easily connect with your friends or add random addresses to expand your network and start messaging.",
    icon: FaUserFriends,
  },
  {
    title: "Send Message",
    desc: "Send instant messages to your friends and enjoy real-time communication across the decentralized network.",
    icon: FaPaperPlane,
  },
  {
    title: "Multi-chain",
    desc: "Access the application seamlessly on multiple blockchain networks, providing flexibility and connectivity.",
    icon: GiChaingun,
  },
  {
    title: "Block Addresses",
    desc: "Effortlessly block spammer addresses with a single click to maintain a clean and spam-free messaging experience.",
    icon: MdOutlineBlock,
  },
  {
    title: "Privacy",
    desc: "Ensure the privacy of your conversations as all data is securely stored on the blockchain and encrypted by default.",
    icon: BsLock,
  },
];

const Features: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {features.map((feature, index) => (
        <FeaturesCard key={index} feature={feature} />
      ))}
    </div>
  );
};
export default Features;
