import { IconType } from "react-icons";
import { UserList } from "@/context/ChatTypes";

export interface FeaturesProps {
  title: string;
  desc: string;
  icon: IconType;
}

export interface UserCardProps {
  name: string;
  accountAddress: string;
}
