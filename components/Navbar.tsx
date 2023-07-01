"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";

import Heading from "@/components/common/Heading";
import Button from "@/components/common/Button";
import NetworkModal from "@/components/ui/NetworkModal";
import { Icons } from "@/components/Icons";
import { useChatContext } from "@/context/DappChat.context";
import { navLinks } from "@/helpers/NavLinks";
import { getCurrentChain } from "@/lib/Api";

import AnonymousIcon from "@/public/assets/anonymous.png";

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [navbar, setNavbar] = useState<boolean>(false);
  const { connectWallet, getUsername, account, setCurrentUser, currentUser } =
    useChatContext();

  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [currentChain, setCurrentChain] = useState<string | undefined>(
    "Set Network"
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchAccountUsername = async () => {
    const username = await getUsername(account);
    setCurrentUser(username || "");
  };

  const handleOpenModal = () => {
    setOpenModal(() => !openModal);
  };

  const getNetwork = async () => {
    const currChain = await getCurrentChain();
    setCurrentChain(currChain);
  };

  useEffect(() => {
    getNetwork();
    fetchAccountUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-40 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between pr-3 md:pr-0 py-3 md:py-5">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src={AnonymousIcon}
              className="rounded-full"
              alt="icon"
              height={50}
              width={50}
            />
            <div className="hidden md:block">
              <Heading
                size="sm"
                className="text-2xl text-black dark:text-white"
              >
                Dapp<span className="text-light-gold">Chat</span>
              </Heading>
            </div>
          </div>
        </Link>
        <div className="hidden md:flex items-center justify-center space-x-6 flex-grow font-bold">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.page}
              className="text-black cursor-pointer hover:-translate-y-1 transition-transform dark:text-neutral-100"
              onClick={() => setNavbar(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-row space-x-2 text-[10px] md:text-lg">
          <Button
            onClick={handleOpenModal}
            className="rounded-xl text-white border font-bold p-3 bg-teal-600 dark:bg-slate-700 border-none block hover:scale-105"
            label={currentChain ? currentChain : "Set Network"}
          />
          <Button
            onClick={() => connectWallet()}
            className="rounded-xl text-white border font-bold p-3 bg-teal-600 dark:bg-blue-700 border-none block hover:scale-105"
            label={account ? account.slice(0, 5) + ".." : "Connect Wallet"}
          />
          <div className="hidden md:flex">
            <Button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="bg-slate-100 p-2 rounded-xl hover:scale-105"
              label={
                currentTheme === "dark" ? (
                  <Icons.Sun size={30} className="h-7 w-7 dark:text-black" />
                ) : (
                  <Icons.Moon size={30} className="h-7 w-7" />
                )
              }
            />
          </div>
          <div className="md:hidden">
            <Button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
              label={
                navbar ? (
                  <Icons.X className="dark:text-white" size={30} />
                ) : (
                  <Icons.Menu className="dark:text-white" size={30} />
                )
              }
            />
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center text-center pb-3 mt-8 md:block z-50 md:pb-0 md:mt-0 ${
          navbar ? "block" : "hidden"
        }`}
      >
        <div className="items-center justify-center md:hidden font-bold space-y-8 md:space-x-6 md:space-y-0">
          {navLinks.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.page}
                className={
                  "block lg:inline-block text-black cursor-pointer hover:scale-105 dark:text-neutral-100"
                }
                onClick={() => setNavbar(!navbar)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="py-2">
            <Button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="bg-slate-100 p-2 rounded-xl hover:scale-105"
              label={
                currentTheme === "dark" ? (
                  <Icons.Sun size={30} className="h-7 w-7 dark:text-black" />
                ) : (
                  <Icons.Moon size={30} className="h-7 w-7" />
                )
              }
            />
          </div>
        </div>
      </div>
      {openModal && (
        <NetworkModal
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });

