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
    <div className="flex flex-col p-4 border">
      {/* List User */}
      <Rank />
    </div>
  );
};

export default RankPage;
