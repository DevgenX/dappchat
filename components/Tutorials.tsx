import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Heading";

const Tutorials = () => {
  return (
    <div className="flex flex-col md:flex-row h-full items-center justify-center">
      <div>
        <Heading size="lg">Experience Blockchain Messaging</Heading>

        <Paragraph
          size="sm"
          className="mt-5 flex font-extralight justify-center"
        >
          Ready to experience the decentralized way of messaging?
        </Paragraph>
        <hr className="w-1/2 h-0.5 mx-auto mt-3 bg-neutral-400 border-0 dark:bg-neutral-200 "></hr>
      </div>
    </div>
  );
};
export default Tutorials;
