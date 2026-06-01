"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { HiOutlineUserGroup, HiOutlineCheck, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

interface GroupData {
  id: string;
  name: string;
  description: string | null;
  invite_code: string;
  competition_id: number | null;
  competition_name: string | null;
}

export default function InviteClient({
  group,
  memberCount,
  alreadyMember,
  hasPassword,
  isAuthenticated,
}: {
  group: GroupData;
  memberCount: number;
  alreadyMember: boolean;
  hasPassword: boolean;
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleJoin = async () => {
    if (!isAuthenticated) {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `/invite/${group.invite_code}` },
      });
      return;
    }

    setLoading(true);
    setError("");

    const body: Record<string, string> = { invite_code: group.invite_code };
    if (hasPassword) body.password = password;

    const res = await fetch("/groups/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const { error: msg } = await res.json();
      setError(msg || "Error al unirse al grupo");
      setLoading(false);
      return;
    }

    const data = await res.json();
    router.push(`/groups/${data.id}`);
  };

  return (
    <div className="text-white px-4 py-16 max-w-lg mx-auto text-center">
      <HiOutlineUserGroup className="mx-auto text-6xl text-teal-400 mb-4" />

      <h1 className="text-3xl font-bold mb-2">{group.name}</h1>

      {group.description && (
        <p className="text-slate-400 mb-4">{group.description}</p>
      )}

      {group.competition_name && (
        <span className="inline-block mb-4 text-xs bg-teal-900/50 text-teal-300 px-2 py-0.5 rounded-full">
          {group.competition_name}
        </span>
      )}

      <p className="text-sm text-slate-400 mb-6">
        {memberCount} {memberCount === 1 ? "miembro" : "miembros"}
      </p>

      {alreadyMember ? (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-green-400">
            <HiOutlineCheck className="text-lg" />
            <span>Ya eres miembro de este grupo</span>
          </div>
          <Link
            href={`/groups/${group.id}`}
            className="inline-block bg-teal-600 hover:bg-teal-500 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Ir al grupo
          </Link>
        </div>
      ) : (
        <>
          {hasPassword && (
            <div className="mb-4">
              <div className="relative max-w-xs mx-auto">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-teal-500 text-center"
                  placeholder="Contraseña del grupo"
                  maxLength={30}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <HiOutlineEyeSlash className="text-lg" /> : <HiOutlineEye className="text-lg" />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm bg-red-900/30 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleJoin}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {loading
              ? "Uniéndose..."
              : isAuthenticated
              ? "Unirse al grupo"
              : "Iniciar sesión para unirse"}
          </button>
        </>
      )}
    </div>
  );
}
