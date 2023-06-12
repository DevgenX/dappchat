import Avatar from "@/components/common/Avatar";
import { FC } from "react";
import { UserCardProps } from "@/types/types";
import { UserList } from "@/context/ChatTypes";

interface UsersCardType {
  user: UserList;
  index: number;
}

const UsersCard: FC<UsersCardType> = ({ user, index }) => {
  return (
    <div className="max-w-sm bg-gray-100 rounded-lg shadow-md p-5 dark:text-white dark:bg-black mx-2 my-2">
      <div className="flex flex-col p-3 pt-3 items-center justify-center">
        <Avatar id={index} name={user.name} />
        <h3>{user.name}</h3>
        <div className="pt-3">
          <p className="text-sm">{user.accountAddress}</p>
        </div>
      </div>
    </div>
  );
};
export default UsersCard;
