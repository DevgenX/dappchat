"use client";

import { FC, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";

import Avatar from "@/components/common/Avatar";
import FriendModal from "@/components/ui/FriendModal";
import { UserList } from "@/context/ChatTypes";

interface UsersCardType {
  user: UserList;
  index: number;
}

const UsersCard: FC<UsersCardType> = ({ user, index }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setOpenModal(() => !openModal);
  };

  const getUserName = (username: string) => {
    if (!username) return;

    if (username.length > 8) {
      return username.charAt(0).toUpperCase() + username.slice(1, 6);
    } else {
      return username;
    }
  };

  return (
    <div className="max-w-sm bg-gray-100 rounded-lg shadow-md p-5 dark:text-white dark:bg-black mx-2 my-2">
      <div className="flex justify-end">
        <BsFillPersonPlusFill
          size={20}
          className="cursor-pointer"
          onClick={handleToggleModal}
        />
      </div>
      <div className="flex flex-col p-3 pt-3 items-center justify-center">
        <Avatar id={index} />
        <h3>{getUserName(user.name)}</h3>
        <div className="pt-3">
          <p className="box-border md:text-sm text-[10px]">
            {user.accountAddress}
          </p>
        </div>
      </div>
      {openModal && <FriendModal setIsModalOpen={setOpenModal} />}
    </div>
  );
};
export default UsersCard;
