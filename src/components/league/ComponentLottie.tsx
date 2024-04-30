"use client";
import React from "react";
import Lottie from "lottie-react";

export const ComponentLottie = ({ img }: { img: any }) => {
  return (
    <div className="w-full absolute bottom-0 max-w-xl mx-auto">
      <Lottie animationData={img} loop={true} className=" w-full h-full boder border-red-400 " />
    </div>
  );
};
