"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import useSupabaseClient from "@/lib/supabase/client";
export const LoginForm = () => {
  const supabase = useSupabaseClient();
  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <div className="flex flex-col w-[15rem] mx-auto">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
      />

      <button className="btn-primary">Ingresar</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <button
        onClick={loginWithGoogle}
        className="btn-secondary text-center flex items-center gap-2"
      >
        <FcGoogle size={25} />
        Ingresar con Google
      </button>
    </div>
  );
};
