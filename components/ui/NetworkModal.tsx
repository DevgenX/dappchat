"use client";

import { useEffect, useMemo } from "react";
import { FC } from "react";
import {
  polygonTest,
  ethTest,
  binanceChain,
  polyChain,
  sepoliaChain,
} from "@/lib/ChainChange";

import Image from "next/image";
import networks from "@/public/logo";
import Icons from "@/components/Icons";
import Heading from "@/components/common/Heading";

interface ModalProps {
  selectedNetwork: string;
  setSelectedNetwork: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NetworkModal: FC<ModalProps> = ({
  selectedNetwork,
  setSelectedNetwork,
  setOpenModal,
}) => {
  const options = useMemo(
    () => [
      { network: "Sepolia", image: networks.sepolia },
      { network: "Goerli", image: networks.goerli },
      { network: "BSC", image: networks.bnb },
      { network: "Mumbai", image: networks.mumbai },
      { network: "Polygon", image: networks.polygon },
      { network: "BSC Testnet", image: networks.bsc },
      { network: "Ethereum", image: networks.eth },
      { network: "FTM", image: networks.ftm },
    ],
    []
  );

  async function enableChain() {
    if (selectedNetwork === "BSC") {
      binanceChain();
    } else if (selectedNetwork === "Polygon") {
      polyChain();
    } else if (selectedNetwork === "Ethereum") {
      // ethChain();
      return;
    } else if (selectedNetwork === "Sepolia") {
      sepoliaChain();
    } else if (selectedNetwork === "BSC Testnet") {
      // bscTest();
      return;
    } else if (selectedNetwork === "Goerli") {
      ethTest();
    } else if (selectedNetwork === "Mumbai") {
      polygonTest();
    }
  }

  useEffect(() => {
    enableChain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNetwork]);

  return (
    <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-opacity-0 z-10">
      <div className="absolute bg-gray-800 rounded-md p-8">
        <button
          className="absolute top-3 right-3"
          onClick={() => setOpenModal(false)}
        >
          <Icons.X className="text-white" />
        </button>
        <Heading size="sm" className="m-3">
          Select Chain
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-2">
          {options.map((chain, index) => (
            <div
              className="flex flex-col items-center justify-center p-5"
              key={index}
            >
              <h3 className="pb-2 text-center text-white">{chain.network}</h3>
              <div
                className="flex items-center justify-center"
                onClick={() => setSelectedNetwork(chain.network)}
              >
                <Image
                  src={chain.image}
                  alt="network"
                  width={35}
                  height={35}
                  className="rounded-full outline-none border-none cursor-pointer hover:scale-125"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkModal;
