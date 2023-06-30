import { FC, ReactElement } from "react";
import { FeaturesProps } from "@/types/types";

interface FeatureCardProps {
  feature: FeaturesProps;
}

const FeatureCardComponent: FC<FeatureCardProps> = ({
  feature,
}): ReactElement => {
  const { title, desc, icon: Icon } = feature;

  return (
    <div className="flex flex-col mx-5 my-5 max-w-sm bg-gray-100 rounded-lg shadow-md p-6 dark:text-white dark:bg-black">
      <div className="flex items-center mb-4">
        <Icon className="text-teal-600 dark:text-white mr-3 text-3xl" />
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-white">{desc}</p>
    </div>
  );
};

export default FeatureCardComponent;
