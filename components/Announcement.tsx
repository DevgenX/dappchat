import Link from "next/link";

const Announcement = () => {
  return (
    <div className="w-[100%] md:w-[50%] mx-3 bg-gray-500 rounded-full  text-white flex justify-center text-center items-center py-2 text-sm">
      <div className="flex items-center p-3 md:p2">
        <span>
          Interacting with <span className="text-light-gold">DappChat</span>{" "}
          costs gas fees. Please use Sepolia testnet and get free Ethereum {""}
          <Link href="https://sepoliafaucet.com/" className="underline">
            Sepolia.
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Announcement;
