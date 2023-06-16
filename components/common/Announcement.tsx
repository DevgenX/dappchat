import Link from "next/link";

const Announcement = () => {
  return (
    <div className="bg-gray-500 text-white flex justify-center items-center py-2 text-sm">
      <div className="flex items-center ">
        <span>
          Interacting with <span className="text-light-gold">DappChat</span>{" "}
          costs gas fees. Please use testnet and get free Ethereum {""}
          <Link href="https://goerlifaucet.com/" className="underline">
            Goerli
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Announcement;
