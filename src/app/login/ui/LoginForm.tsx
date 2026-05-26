"use client";
import { FcGoogle } from "react-icons/fc";
import useSupabaseClient from "@/lib/supabase/client";

export const LoginForm = () => {
  const supabase = useSupabaseClient();

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };


  return (
    <div className="flex flex-col">
      <button
        onClick={loginWithGoogle}
        className="btn-secondary text-center flex items-center gap-2 w-15"
      >
        <FcGoogle size={25} />
        Ingresar con Google
      </button>
    </div>
  );
};
