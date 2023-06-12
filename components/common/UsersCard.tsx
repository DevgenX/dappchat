"use client";

import Avatar from "@/components/common/Avatar";
import { FC, useState } from "react";
import { UserList } from "@/context/ChatTypes";
import { BsFillPersonPlusFill } from "react-icons/bs";
import FriendModal from "@/components/common/FriendModal";

interface UsersCardType {
  user: UserList;
  index: number;
}

const UsersCard: FC<UsersCardType> = ({ user, index }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setOpenModal(() => !openModal);
  };

  return (
    <div className="max-w-sm bg-gray-100 rounded-lg shadow-md p-5 dark:text-white dark:bg-black mx-2 my-2">
      <BsFillPersonPlusFill
        size={20}
        className="float-right hover:scale-105 cursor-pointer"
        onClick={handleToggleModal}
      />
      <div className="flex flex-col p-3 pt-3 items-center justify-center">
        <Avatar id={index} name={user.name} />
        <h3>{user.name}</h3>
        <div className="pt-3">
          <p className="text-sm">{user.accountAddress}</p>
        </div>
      </div>
      {openModal && (
        <FriendModal isModalOpen={openModal} setIsModalOpen={setOpenModal} />
      )}
    </div>
  );
};
export default UsersCard;
