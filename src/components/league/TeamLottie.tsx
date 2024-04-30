'use client'
import React from "react";
import Lottie from "lottie-react";
import teamLottie from "./../../assets/teamLottie.json";

export const TeamLottie = () => {
  return (
    <div className="w-full absolute bottom-0 max-w-xl">
      <Lottie
        animationData={teamLottie}
        loop={true}
        className=" w-full h-full"
      />
    </div>
  );
};
