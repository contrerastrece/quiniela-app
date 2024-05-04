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
    <button className="text-red-400 text-sm border border-red-400 px-2 p-1 rounded-md" onClick={logOut}>
      Logout
    </button>
    // <user);>
  );
};
