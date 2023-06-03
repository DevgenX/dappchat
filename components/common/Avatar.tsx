import { FC } from "react";

interface AvatarProps {
  id: number;
  name: string;
}

const Avatar: FC<AvatarProps> = ({ id, name }) => {
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-blue-200",
    "bg-teal-200",
  ];

  return (
    <div
      className={`w-8 h-8 ${colors[id]} rounded-full flex items-center justify-center`}
    >
      {name[0]}
    </div>
  );
};
export default Avatar;
