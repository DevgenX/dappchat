import { FC } from "react";
import Image from "next/image";
import Avatars from "@/public/icons";

interface AvatarProps {
  id: number;
}

const Avatar: FC<AvatarProps> = ({ id }) => {
  const { Icon1, Icon2, Icon4, Icon5, Icon6, Icon7, Icon8 } = Avatars;

  const avatars = [Icon1, Icon2, Icon4, Icon5, Icon6, Icon7, Icon8];

  const avatarIndex = id % avatars.length;
  const avatarSrc = avatars[avatarIndex];

  return (
    <div className={"w-8 h-8 flex items-center justify-center"}>
      <Image
        src={avatarSrc}
        className="rounded-full"
        alt="avatar"
        height={60}
        width={60}
      />
    </div>
  );
};

export default Avatar;
