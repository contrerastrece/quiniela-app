"use client";
import useSupabaseClient from "@/lib/supabase/client";
import React from "react";

export const BtnLogOut = () => {
  const supabase = useSupabaseClient();
  const logOut = async () => {
    await supabase.auth.signOut();

    window.location.reload();
  };
  return (
    // <form action={logoutAction} className="flex">
    <button className="ml-4 text-red-500 " onClick={logOut}>
      Logout
    </button>
    // </form>
  );
};
