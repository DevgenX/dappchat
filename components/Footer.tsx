import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMedium,
} from "react-icons/ai";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto max-w-2xl px-4 sm:p-6 md:max-w-7xl">
      <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-400 border-0 dark:bg-neutral-200 "></hr>
      <div className="mx-auto p-4 mb-2 text-black text-center flex flex-col dark:text-neutral-100 md:flex-row md:justify-between">
        <div className="text-black dark:text-light-gold mb-3">
          Made with ❤ by <span className="font-bold">Seb</span>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
          <Link
            href="https://github.com/DevgenX"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineGithub
              className="hover:-translate-y-1 transition-transform cursor-pointer text-black dark:text-neutral-100"
              size={30}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/sebgonzales/"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              className="hover:-translate-y-1 transition-transform cursor-pointer text-black dark:text-neutral-100"
              size={30}
            />
          </Link>
          <Link
            href="https://medium.com/@seb_5882"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineMedium
              className="hover:-translate-y-1 transition-transform cursor-pointer text-black dark:text-neutral-100"
              size={30}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
