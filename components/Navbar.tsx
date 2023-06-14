"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { useTheme } from "next-themes";
import { navLinks } from "@/helpers/NavLinks";
import AnonymousIcon from "@/public/anonymous.png";
import Image from "next/image";
import { useChatContext } from "@/context/ChatDapp.context";
import dynamic from "next/dynamic";

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const { connectWallet, getUsername, account } = useChatContext();

  const accountUser = async () => {
    const username = await getUsername(account);

    setCurrentUser(username);
  };

  useEffect(() => {
    accountUser();
  });

  return (
    <header className="w-[80%] mx-auto px-4 sm:px-20">
      <div className="justify-between md:items-center md:flex">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <div className="container flex items-center space-x-2">
              <Image src={AnonymousIcon} alt="icon" height={50} width={50} />
              <h2 className="text-2xl text-black font-bold dark:text-white">
                ChatDapp
              </h2>
            </div>
          </Link>
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <Icons.X className="dark:text-white" size={30} />
              ) : (
                <Icons.Menu className="dark:text-white" size={30} />
              )}
            </button>
          </div>
        </div>

        <div>
          <div
            className={`flex justify-center text-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center font-bold space-y-8 md:flex md:space-x-6 md:space-y-0">
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
              <button
                onClick={() => connectWallet()}
                className="rounded-xl text-white border p-3 bg-teal-600 dark:bg-blue-600 border-none block hover:scale-105"
              >
                {account ? currentUser : "CONNECT WALLET"}
              </button>
              {currentTheme === "dark" ? (
                <button
                  onClick={() => setTheme("light")}
                  className="bg-slate-100 p-2 rounded-xl"
                >
                  <Icons.Sun size={30} className="h-7 w-7 dark:text-black" />
                </button>
              ) : (
                <button
                  onClick={() => setTheme("dark")}
                  className="bg-slate-100 p-2 rounded-xl"
                >
                  <Icons.Moon size={30} className="h-7 w-7" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
