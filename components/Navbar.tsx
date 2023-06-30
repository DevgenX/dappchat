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
    <div className="w-[80%] mx-auto px-4 sm:px-20">
      <div className="flex items-center justify-between py-3 md:py-5">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src={AnonymousIcon}
              className="rounded-full"
              alt="icon"
              height={50}
              width={50}
            />
            <Heading
              size="sm"
              className="text-[20px] md:text-2xl text-black font-bold dark:text-white"
            >
              DappChat
            </Heading>
          </div>
        </Link>
        <div className="hidden md:flex items-center justify-center space-x-6 flex-grow font-bold">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.page}
              className="text-neutral-900 cursor-pointer hover:scale-105 dark:text-neutral-100"
              onClick={() => setNavbar(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="items-center space-x-2 hidden md:flex">
          <Button
            onClick={handleOpenModal}
            className="rounded-xl text-white border font-bold p-3 bg-teal-600 dark:bg-blue-600 border-none block hover:scale-105"
            label={currentChain ? currentChain : "Set Network"}
          />

          <Button
            onClick={() => connectWallet()}
            className="rounded-xl text-white border font-bold p-3 bg-teal-600 dark:bg-blue-600 border-none block hover:scale-105"
            label={account ? account.slice(0, 5) + ".." : "CONNECT WALLET"}
          />

          <Button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
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
      <div
        className={`flex justify-center text-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
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
                  "block lg:inline-block text-neutral-900 cursor-pointer hover:scale-105 dark:text-neutral-100"
                }
                onClick={() => setNavbar(!navbar)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex flex-col items-center justify-center">
            <Button
              onClick={handleOpenModal}
              className="rounded-xl justify-center text-white border mb-3 font-bold p-3 bg-teal-600 dark:bg-blue-600 border-none block hover:scale-105"
              label={currentChain ? currentChain : "Set Network"}
            />
            <Button
              onClick={() => connectWallet()}
              className="rounded-xl text-white border font-bold p-3 bg-teal-600 mb-3 dark:bg-blue-600 border-none block hover:scale-105"
              label={account ? account.slice(0, 5) + ".." : "CONNECT WALLET"}
            />
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
        {openModal && (
          <NetworkModal
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
