import React from "react";
import { ComponentLottie } from "@/components";
import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import img from '../../../assets/building.json'
const RankPage = async () => {
  const {
    data: { user },
  } = await getUserSession();

  if (!user) {
    return redirect("/login");
  }

  return <div className="w-full flex justify-center items-center">
    
    <ComponentLottie img={img}/>
  </div>;
};

export default RankPage;
