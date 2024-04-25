import createSupabaseServerClient from "@/lib/supabase/server";
import React from "react";

export const BtnLogOut = () => {
  const logoutAction = async () => {
    'use server'
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  };
  return (
    <form action={logoutAction} className="flex">
      <button className="ml-4 text-red-500 ">Logout</button>
    </form>
  );
};
