import { FC, SetStateAction } from "react";

import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Icons from "@/components/Icons";
import Button from "@/components/common/Button";

import { useChatContext } from "@/context/DappChat.context";

interface ModalProps {
  toggleBlockModal: React.Dispatch<SetStateAction<boolean>>;
}

const BlockModal: FC<ModalProps> = ({ toggleBlockModal }) => {
  const { handleUnblockUser, blockedUsers } = useChatContext();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-0 z-10 p-3">
      <div className="bg-gray-800 text-white rounded-lg p-6 mx-4 sm:mx-auto w-full max-w-md">
        <div className="flex justify-between items-center">
          <Heading size="sm" className="text-2xl font-bold mb-3">
            Blocked Users
          </Heading>
          <button onClick={() => toggleBlockModal((prev) => !prev)}>
            <Icons.X className="relative pt-1 mt-4 md:mt-2 bottom-10 left-4" />
          </button>
        </div>
        <Paragraph size="sm">Click an address to unblock</Paragraph>
        <div className="text-slate-200 text-sm flex flex-wrap justify-center items-center p-3">
          {blockedUsers.length >= 1 ? (
            blockedUsers.map((address, index) => (
              <div key={index} className="p-2">
                <h3
                  className="cursor-pointer md:text-sm text-[12px]"
                  onClick={() => handleUnblockUser(address)}
                >
                  {address}
                </h3>
              </div>
            ))
          ) : (
            <Paragraph>You don&apos;t have any blocked addresses</Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockModal;
