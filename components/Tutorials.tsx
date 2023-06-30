import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";

const Tutorials = () => {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <Heading size="default">Experience Blockchain Messaging</Heading>
        <Paragraph className="mt-5 px-5 font-extralight">
          Ready to explore the decentralized way of messaging?
        </Paragraph>
        <hr className="w-1/2 h-0.5 mx-auto mt-3 bg-neutral-400 border-0 dark:bg-neutral-200 "></hr>
      </div>
    </div>
  );
};
export default Tutorials;
