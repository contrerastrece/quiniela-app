"use client";
import { FcGoogle } from "react-icons/fc";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export const LoginForm = () => {
  const loginWithGoogle = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={loginWithGoogle}
        className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98]"
      >
        <FcGoogle size={22} />
        Continuar con Google
      </button>
      <p className="text-xs text-slate-500 mt-3 text-center">
        Solo usamos tu perfil de Google para identificarte.
      </p>
    </div>
  );
};
