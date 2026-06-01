"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineLink } from "react-icons/hi2";

export default function JoinGroupPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Ingresa un código de invitación");
      return;
    }

    setLoading(true);

    const res = await fetch("/groups/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invite_code: code.trim() }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error al unirse");
      setLoading(false);
      return;
    }

    router.push(`/groups/${data.id}`);
  };

  return (
    <div className="text-white px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-teal-400 mb-6">
        Unirse a un grupo
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Código de invitación
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white text-center text-xl font-mono tracking-widest focus:outline-none focus:border-teal-500 uppercase"
            placeholder="ABC12345"
            maxLength={8}
          />
          <p className="text-xs text-slate-500 mt-1 text-center">
            Ingresa el código de 8 caracteres que te compartieron
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-900/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || code.length < 4}
          className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <HiOutlineLink className="text-lg" />
          {loading ? "Buscando..." : "Unirse al grupo"}
        </button>
      </form>

      <Link
        href="/groups"
        className="inline-block mt-6 text-sm text-slate-400 hover:text-white transition-colors"
      >
        &larr; Volver a grupos
      </Link>
    </div>
  );
}
