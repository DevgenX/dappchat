"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";

const Loading: FC = () => {
  return (
    <div className="mx-auto w-full h-full flex py-3 md:py-0 flex-col justify-center items-center bg-transparent">
      <motion.div
        className="spinner animate-spin"
        style={{
          width: 50,
          height: 50,
          borderTop: "4px solid #fff",
          borderRight: "4px solid #f5bc51",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p className="text-sm text-white p-2">Please wait...</p>
    </div>
  );
};

export default Loading;
