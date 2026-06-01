"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { HiOutlineUserGroup, HiOutlineCheck, HiOutlineClock } from "react-icons/hi2";

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
  pendingRequest,
  isAuthenticated,
}: {
  group: GroupData;
  memberCount: number;
  alreadyMember: boolean;
  pendingRequest: boolean;
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleRequestJoin = async () => {
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

    const res = await fetch("/groups/api/join-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_id: group.id }),
    });

    if (!res.ok) {
      const { error: msg } = await res.json();
      setError(msg || "Error al solicitar unirse");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
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
      ) : pendingRequest || sent ? (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <HiOutlineClock className="text-lg" />
            <span>Solicitud enviada — esperando aprobación del admin</span>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <p className="text-red-400 text-sm bg-red-900/30 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}
          <button
            onClick={handleRequestJoin}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {loading
              ? "Enviando..."
              : isAuthenticated
              ? "Solicitar unirse"
              : "Iniciar sesión para solicitar"}
          </button>
        </>
      )}
    </div>
  );
}
