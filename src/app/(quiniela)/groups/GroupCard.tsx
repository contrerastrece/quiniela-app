"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineUserGroup, HiOutlineArrowRightOnRectangle, HiOutlineTrash } from "react-icons/hi2";

export default function GroupCard({
  group,
  isAdmin,
  pendingCount = 0,
}: {
  group: { id: string; name: string; description: string | null; invite_code: string; competition_id: number | null; competition_name: string | null };
  isAdmin: boolean;
  pendingCount?: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const handleLeave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`¿Salir del grupo "${group.name}"?`)) return;
    setBusy(true);
    try {
      await fetch("/groups/api/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id: group.id }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`¿Eliminar el grupo "${group.name}"? Esta acción no se puede deshacer.`)) return;
    setBusy(true);
    try {
      await fetch("/groups/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id: group.id }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Link
      href={`/groups/${group.id}`}
      className="group block bg-slate-800 rounded-xl p-4 transition-all border border-slate-700 hover:border-teal-700/50 hover:shadow-lg hover:shadow-teal-900/10"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-teal-900/30 transition-colors">
          <HiOutlineUserGroup className="text-lg text-slate-400 group-hover:text-teal-400 transition-colors" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-semibold text-white truncate">{group.name}</h2>
            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
              {isAdmin && pendingCount > 0 && (
                <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded-full font-medium">
                  {pendingCount} solicitud{pendingCount !== 1 ? "es" : ""}
                </span>
              )}
              <span className="text-[10px] text-slate-500 font-mono bg-slate-700 px-1.5 py-0.5 rounded">
                {group.invite_code}
              </span>
            </div>
          </div>
          {group.description && (
            <p className="text-xs text-slate-500 mt-0.5 truncate">{group.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {group.competition_name && (
              <span className="text-[10px] bg-teal-900/40 text-teal-300 px-1.5 py-0.5 rounded-full">
                {group.competition_name}
              </span>
            )}
            <span className="text-[10px] text-slate-500">
              {group.competition_id ? "Competición específica" : "Todas las ligas"}
            </span>
          </div>
          <div className="flex gap-2 mt-3 pt-2 border-t border-slate-700/50" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <button
              onClick={handleLeave}
              disabled={busy}
              className="text-[10px] text-slate-400 hover:text-red-400 bg-slate-700 hover:bg-red-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
            >
              <HiOutlineArrowRightOnRectangle className="text-xs" />
              Salir
            </button>
            {isAdmin && (
              <button
                onClick={handleDelete}
                disabled={busy}
                className="text-[10px] text-slate-400 hover:text-red-400 bg-slate-700 hover:bg-red-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
              >
                <HiOutlineTrash className="text-xs" />
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
