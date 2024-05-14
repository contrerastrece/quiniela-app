import { LeagueContent } from "@/components";
import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import React from "react";

const CategoryPage = async ({ params }: any) => {
  const {
    data: { user },
  } = await getUserSession();

  if (!user) {
    return redirect("/login");
  }
  const { id } = params;

  return (
    <div className="p-2">
      <LeagueContent id={id} />
    </div>
  );
};

export default CategoryPage;
