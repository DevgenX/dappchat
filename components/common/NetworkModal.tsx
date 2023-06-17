"use client";

import { useEffect, useMemo } from "react";
import { FC } from "react";
import {
  bscTest,
  polygonTest,
  ethChain,
  ethTest,
  binanceChain,
  polyChain,
  hardChain,
} from "@/lib/ChainChange";
import Image from "next/image";
import networks from "@/public/logo";
import Icons from "@/components/Icons";

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
  const selectedValue = useMemo(
    () => selectedNetwork.replaceAll("_", " "),
    [selectedNetwork]
  );

  const options = useMemo(
    () => [
      { network: "Ethereum", image: networks.eth },
      { network: "BSC", image: networks.bnb },
      { network: "Polygon", image: networks.polygon },
      { network: "Hardhat", image: networks.hardhat },
      { network: "Goerli", image: networks.goerli },
      { network: "BSC Testnet", image: networks.bsc },
      { network: "Mumbai", image: networks.mumbai },
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
      ethChain();
    } else if (selectedNetwork === "Hardhat") {
      hardChain();
    } else if (selectedNetwork === "BSC Testnet") {
      bscTest();
    } else if (selectedNetwork === "Goerli") {
      ethTest();
    } else if (selectedNetwork === "Mumbai") {
      polygonTest();
    }
  }

  useEffect(() => {
    enableChain();
  }, [selectedNetwork]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-0">
      <div className="absolute bg-gray-800 rounded-md p-8">
        <button
          className="absolute top-3 right-3"
          onClick={() => setOpenModal(false)}
        >
          <Icons.X />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {options.map((chain, index) => (
            <div
              className="flex flex-col items-center justify-center p-5"
              key={index}
            >
              <h3 className="pb-2 text-center">{chain.network}</h3>
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
