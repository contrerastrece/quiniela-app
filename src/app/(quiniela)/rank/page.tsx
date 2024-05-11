import React from "react";
import { ComponentLottie, Rank } from "@/components";
import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";
const RankPage = async () => {
  const {
    data: { user },
  } = await getUserSession();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col p-4 max-w-xl mx-auto my-4 rounded-md">
      {/* List User */}
      <Rank usuario={user}/>
    </div>
  );
};

export default RankPage;
