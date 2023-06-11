import Avatar from "@/components/common/Avatar";
import { FC } from "react";
import { UserCardProps } from "@/types/types";

interface UsersCardType {
  user: UserCardProps;
  index: number;
}

const UsersCard: FC<UsersCardType> = ({ user, index }) => {
  return (
    <div className="max-w-sm bg-gray-100 rounded-lg shadow-md p-5 dark:text-white dark:bg-black mx-2 my-2">
      <div className="flex p-3 items-center justify-center">
        <Avatar id={index} name={user.name} />
        <h3>{user.name}</h3>
        <div className="block px-3">
          <p>{user.address}</p>
        </div>
      </div>
    </div>
  );
};
export default UsersCard;
