import { FC } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import Avatar from "@/components/ui/Avatar";

interface FriendProps {
  name: string;
  address: string;
}

const friends: FriendProps[] = [
  {
    name: "Jason",
    address: "0x7213232",
  },
  {
    name: "Mark",
    address: "0x7213232",
  },
  {
    name: "John",
    address: "0x7213232",
  },
];

interface FriendListProps {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

const FriendList: FC<FriendListProps> = ({ selectedUser, setSelectedUser }) => {
  const selectFriend = (user: string) => {
    setSelectedUser(user);
  };
  return (
    <>
      <div className="bg-slate-500 p-2 w-full md:w-1/3 text-white md:rounded-l-lg mb-4 md:mb-0">
        <div className="my-3 gap-2">
          <div className="flex justify-between border-b border-gray-500 mx-3">
            <div className="mb-3">
              <h1>John Doe</h1>
            </div>
            <div className="flex cursor-pointer">
              <div className="pr-3">
                <BsFillPersonPlusFill size={20} />
              </div>
              <div>
                <CiMenuKebab size={20} />
              </div>
            </div>
          </div>
          {friends.map((friend, index) => (
            <div
              key={index}
              onClick={() => selectFriend(friend.name)}
              className={`border-b border-gray-500  hover:bg-slate-600 flex mb-2 items-center gap-2 ${
                selectedUser?.trim().toLowerCase() ===
                friend.name.trim().toLowerCase()
                  ? "bg-slate-600"
                  : ""
              }`}
            >
              {selectedUser === friend.name && (
                <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>
              )}
              <div className="flex gap-2 py-2 pl-4 items-center justify-center">
                <Avatar id={index} name={friend.name} />
                <span>{friend.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default FriendList;
