"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CompetitionOption {
  id: number;
  name: string;
  emblem: string;
  code: string;
}

export default function NewGroupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [competitionId, setCompetitionId] = useState<number | null>(null);
  const [competitionName, setCompetitionName] = useState<string | null>(null);
  const [competitions, setCompetitions] = useState<CompetitionOption[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/competitions/api")
      .then((r) => r.json())
      .then((data) => {
        if (data?.competitions) setCompetitions(data.competitions);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre del grupo es obligatorio");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/groups/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          competition_id: competitionId,
          competition_name: competitionName,
        }),
      });

      const group = await res.json();

      if (!res.ok) {
        setError(group.error || "Error al crear el grupo");
        setLoading(false);
        return;
      }

      if (!group?.id) {
        setError("Error: el grupo se creó pero no se obtuvo el ID");
        setLoading(false);
        return;
      }

      window.location.href = `/groups/${group.id}`;
    } catch (err) {
      console.error("Error creating group:", err);
      setError("Error de conexión al crear el grupo");
      setLoading(false);
    }
  };

  return (
    <div className="text-white px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-teal-400 mb-6">Crear grupo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Nombre del grupo *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
            placeholder="Ej: Quiniela Premier 2026"
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Descripción (opcional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500 resize-none"
            placeholder="Una breve descripción..."
            rows={3}
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Competición (opcional)
          </label>
          <select
            value={competitionId ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setCompetitionId(null);
                setCompetitionName(null);
              } else {
                const comp = competitions.find(
                  (c) => c.id === Number(val)
                );
                setCompetitionId(Number(val));
                setCompetitionName(comp?.name ?? null);
              }
            }}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
          >
            <option value="">Todas las competiciones</option>
            {competitions.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">
            Si eliges una competición, el ranking del grupo solo contará
            predicciones de esa competición.
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-900/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {loading ? "Creando..." : "Crear grupo"}
        </button>
      </form>
    </div>
  );
}
