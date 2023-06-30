import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Image from "next/image";
import Link from "next/link";
import Medium from "@/public/assets/Medium.png";

const Tutorials = () => {
  return (
    <div className="mx-auto container flex flex-col justify-center items-center">
      <div className="px-5 flex flex-col items-center">
        <Heading size="default">Experience Blockchain Messaging</Heading>
        <Paragraph className="mt-5 px-5 font-extralight text-black dark:text-white">
          Ready to explore the decentralized way of messaging?
        </Paragraph>
        <hr className="w-[60%] h-0.5 mx-auto mt-3 bg-neutral-400 border-0 dark:bg-neutral-200 " />
      </div>

      <div className="my-10 w-1/2">
        <Heading size="sm" className="mb-2">
          Download Metamask
        </Heading>
        <div className="aspect-w-16 aspect-h-10 hover:scale-105 mb-10">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-HTubEJ61zU"
            title="Metamask Download"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <Heading size="sm" className="mt-5 mb-2">
          Watch the tutorial
        </Heading>
        <div className="aspect-w-16 aspect-h-10 hover:scale-105">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/mU5GEzbzZoA"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <Heading size="sm" className="mt-5 mb-2">
          Read the blog
        </Heading>
        <div className="hover:scale-105 shadow-md">
          <Link href="https://medium.com/@seb_5882/dappchat-a-multi-chain-and-fully-on-chain-decentralized-messaging-61d7bd3dcef3">
            <Image
              src={Medium}
              alt="medium"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Tutorials;
