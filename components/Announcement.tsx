import Link from "next/link";

const Announcement = () => {
  return (
    <div className="bg-gray-500 text-white flex justify-center text-center items-center py-2 text-sm">
      <div className="flex items-center">
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
