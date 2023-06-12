import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Heading";

const Tutorials = () => {
  return (
    <div className="flex flex-col md:flex-row h-full items-center justify-center">
      <div>
        <Heading size="lg" data-testid="heading">
          Experience Blockchain Messaging
        </Heading>
        <Paragraph
          size="sm"
          className="mt-5 flex font-extralight justify-center"
          data-testid="paragraph"
        >
          Ready to experience the decentralized way of messaging?
        </Paragraph>
      </div>
    </div>
  );
};
export default Tutorials;
