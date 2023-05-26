type Metadata = {
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: "ChatDapp | Users",
  description: "A multi-chain decentralized messaging application ",
};

const page = () => {
  return (
    <div className="border border-red-500">
      <h1>Hello world</h1>
    </div>
  );
};
export default page;
