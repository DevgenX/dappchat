import React, { useEffect, useMemo, useState } from "react";
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

export default function ConnectChain() {
  const [selected, setSelected] = useState<string>("Set Network");
  const selectedValue = useMemo(
    () => selected.replaceAll("_", " "),
    [selected]
  );

  const options = useMemo(
    () => [
      { value: "Ethereum", label: "Ethereum" },
      { value: "Binance Smart Chain", label: "Binance Smart Chain" },
      { value: "Polygon", label: "Polygon" },
      { value: "Hardhat", label: "Hardhat" },
      { value: "Goerli", label: "Goerli" },
      { value: "Bsctest", label: "Bsctest" },
      { value: "Mumbai", label: "Mumbai" },
    ],
    []
  );

  const blockImage = useMemo(() => {
    if (selectedValue === "Ethereum") {
      return (
        <Image alt="eth" src="./ethereumlogo.png" width={25} height={25} />
      );
    } else if (selectedValue === "Binance Smart Chain") {
      return <Image alt="bsc" src="./bsc.png" width={25} height={25} />;
    } else if (selectedValue === "Polygon") {
      return (
        <Image alt="poly" src="./polygonwhite.png" width={25} height={25} />
      );
    } else if (selectedValue === "Mumbai") {
      return (
        <Image alt="mumbai" src="./polygonwhite.png" width={25} height={25} />
      );
    } else if (selectedValue === "Bsctest") {
      return (
        <Image alt="goerli" src="./polygonwhite.png" width={25} height={25} />
      );
    } else if (selectedValue === "Goerli") {
      return (
        <Image alt="hardhat" src="./polygonwhite.png" width={25} height={25} />
      );
    } else if (selectedValue === "Hardhat") {
      return <Image alt="" src="./polygonwhite.png" width={25} height={25} />;
    } else if (selectedValue === "Set Network") {
      return (
        <div className="mt-4">
          <h3>Select Network</h3>
        </div>
      );
    }
  }, [selectedValue]);

  async function enableChain() {
    if (selected === "Binance Smart Chain") {
      binanceChain();
    } else if (selected === "Polygon") {
      polyChain();
    } else if (selected === "Ethereum") {
      ethChain();
    } else if (selected === "Hardhat") {
      hardChain();
    } else if (selected === "Bsctest") {
      bscTest();
    } else if (selected === "Goerli") {
      ethTest();
    } else if (selected === "Mumbai") {
      polygonTest();
    }
  }

  useEffect(() => {
    enableChain();
  }, [selected]);

  return (
    <div className="mt-6">
      <select
        className="bg-black bg-opacity-70 shadow-sm font-sf-pro font-medium text-white text-2xl capitalize"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="mt-4">{blockImage}</div>
    </div>
  );
}
