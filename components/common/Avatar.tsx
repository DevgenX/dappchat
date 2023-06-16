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
    "bg-orange-200",
    "bg-indigo-200",
    "bg-cyan-200",
    "bg-lime-200",
    "bg-gray-200",
  ];

  const colorIndex = id % colors.length;

  return (
    <div
      className={`w-8 h-8 ${colors[colorIndex]} rounded-full flex items-center justify-center`}
    >
      {name[0]?.toLocaleUpperCase()}
    </div>
  );
};

export default Avatar;
