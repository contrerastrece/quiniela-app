"use client";
import { useState } from "react";
import LeagueTable from "@/components/league/LeagueTable";
import { Match } from "@/types";
import { FilterStatus } from "@/components/ui/filter/FilterStatus";
import { SkeletonCard } from "@/components/ui/skeleton/SkeletonCard";
import { useQuery } from "@tanstack/react-query";
import { getSevenDays, getMatches } from "@/api";
import moment from "moment";
import {
  HiOutlineClipboard,
  HiOutlineCheck,
  HiOutlineUsers,
  HiOutlineTrophy,
  HiOutlineStar,
  HiOutlineInformationCircle,
  HiOutlineFire,
  HiOutlineArrowRightOnRectangle,
  HiOutlineXMark,
  HiOutlineCheckBadge,
  HiOutlineNoSymbol,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface GroupData {
  id: string;
  name: string;
  description: string | null;
  invite_code: string;
  competition_id: number | null;
  competition_name: string | null;
  created_at: string;
  password?: string | null;
}

interface MemberData {
  user_id: string;
  role: "admin" | "member";
  joined_at: string;
  user: { id: string; name: string; url_image: string };
}

interface RankingData {
  id_user: string;
  name: string;
  url_image: string;
  total_points: number;
}

type Tab = "partidos" | "ranking" | "miembros" | "info";

const rankColors = [
  { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  { bg: "bg-slate-300/20", text: "text-slate-200", border: "border-slate-400/30" },
  { bg: "bg-amber-700/20", text: "text-amber-500", border: "border-amber-700/30" },
];

export default function GroupWorkspace({
  group,
  members,
  rankings,
  isAdmin,
  currentUserId,
}: {
  group: GroupData;
  members: MemberData[];
  rankings: RankingData[];
  isAdmin: boolean;
  currentUserId: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("partidos");
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState("Todos");
  const [day, setDay] = useState(moment().format("YYYY-MM-DD"));
  const days = getSevenDays();

  const [leaving, setLeaving] = useState(false);
  const adminCount = members.filter((m) => m.role === "admin").length;

  const leaveGroup = async () => {
    if (isAdmin && adminCount === 1) {
      if (!confirm("Eres el único admin. Si te vas, el grupo se quedará sin administradores. ¿Salir de todas formas?")) return;
    } else {
      if (!confirm("¿Seguro que quieres salir del grupo?")) return;
    }
    setLeaving(true);
    try {
      await fetch("/groups/api/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id: group.id }),
      });
      router.push("/groups");
    } finally {
      setLeaving(false);
    }
  };

  const expelMember = async (userId: string, name: string) => {
    if (!confirm(`¿Expulsar a ${name}?`)) return;
    try {
      await fetch("/groups/api/expel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id: group.id, user_id: userId }),
      });
      router.refresh();
    } catch {}
  };

  const baseUrl = (
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" ? window.location.origin : "")
  ).replace(/\/+$/, "");
  const { data: pendingRequests, refetch: refetchRequests } = useQuery({
    queryKey: ["join-requests", group.id],
    queryFn: () =>
      fetch(`/groups/api/join-requests?group_id=${group.id}`)
        .then((r) => r.json()),
    enabled: isAdmin,
  });

  const handleRequest = async (requestId: string, action: "approve" | "reject") => {
    await fetch("/groups/api/join-request/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: requestId, action }),
    });
    refetchRequests();
  };

  const inviteLink = `${baseUrl}/invite/${group.invite_code}`;

  const copyInvite = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasCompetition = !!group.competition_id;

  const { isLoading, data: matches } = useQuery({
    queryKey: hasCompetition
      ? ["dataMatchesByLeague", group.competition_id]
      : ["dataMatches", day],
    queryFn: hasCompetition
      ? () =>
          fetch(`/leagues/api?id=${group.competition_id}`)
            .then((r) => r.json())
            .then((d) => d.matches)
      : () => getMatches(day),
    staleTime: 60 * 1000,
  });

  const matchesArray: Match[] = Array.isArray(matches)
    ? matches
    : matches && typeof matches === "object"
    ? (matches as any)[day] || []
    : [];

  let matchesFilter: Match[] = [];
  if (matchesArray.length > 0) {
    switch (state) {
      case "Finalizados":
        matchesFilter = matchesArray.filter((m) => m.status === "FINISHED");
        break;
      case "En Vivo":
        matchesFilter = matchesArray.filter((m) => m.status === "IN_PLAY");
        break;
      case "Próximos":
        matchesFilter = matchesArray.filter((m) => m.status === "TIMED");
        break;
      default:
        matchesFilter = matchesArray;
        break;
    }
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "partidos", label: "Partidos", icon: HiOutlineFire },
    { key: "ranking", label: "Ranking", icon: HiOutlineTrophy },
    { key: "miembros", label: "Miembros", icon: HiOutlineUsers },
    { key: "info", label: "Info", icon: HiOutlineInformationCircle },
  ];

  return (
    <div className="text-white px-2 md:px-4 py-4 max-w-4xl mx-auto">
      {/* Tab bar */}
      <div className="flex border-b border-slate-700 mb-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 md:px-5 py-2.5 text-xs md:text-sm font-semibold transition-colors border-b-2 -mb-[2px] ${
                tab === t.key
                  ? "text-teal-400 border-teal-400"
                  : "text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              <Icon className="text-sm md:text-base" />
              {t.label}
              {t.key === "miembros" && (
                <span className="text-[10px] text-slate-500 ml-0.5">
                  {members.length}
                </span>
              )}
              {t.key === "info" && isAdmin && pendingRequests && pendingRequests.length > 0 && (
                <span className="text-[10px] text-yellow-400 ml-0.5">
                  ({pendingRequests.length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Partidos tab */}
      {tab === "partidos" && (
        <div>
          {!hasCompetition && (
            <div className="flex gap-2 mb-3 overflow-x-auto py-1">
              {days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setDay(d.other)}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    d.other === day
                      ? "bg-teal-400 font-semibold hover:bg-teal-500"
                      : "bg-slate-500 font-regular hover:bg-slate-600"
                  }`}
                >
                  <span className="uppercase text-[10px] flex flex-col items-center gap-0.5 tracking-wide">
                    <span>{d.weekday}</span>
                    <span>{d.day}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          <FilterStatus status={state} setState={setState} />

          <div className="mt-2 space-y-2">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : matchesFilter.length > 0 ? (
              matchesFilter.map((match) => (
                <LeagueTable data={match} key={match.id} />
              ))
            ) : (
              <p className="text-center text-slate-500 py-16">
                No hay partidos para mostrar
              </p>
            )}
          </div>
        </div>
      )}

      {/* Ranking tab */}
      {tab === "ranking" && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            Ranking de {group.name}
          </h2>
          {rankings.length === 0 ? (
            <p className="text-slate-500 text-center py-16">
              Sin puntuaciones todavía
            </p>
          ) : (
            <div className="space-y-2">
              {rankings.map((r, i) => {
                const medal = i < 3 ? (
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${rankColors[i].bg} ${rankColors[i].text} border ${rankColors[i].border}`}
                  >
                    {i === 0 ? (
                      <HiOutlineTrophy className="text-sm" />
                    ) : (
                      i + 1
                    )}
                  </span>
                ) : (
                  <span className="w-7 text-center font-mono text-sm text-slate-500">
                    {i + 1}
                  </span>
                );

                return (
                  <div
                    key={r.id_user}
                    className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 border border-slate-700"
                  >
                    {medal}
                    <img
                      src={r.url_image}
                      alt={r.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="flex-1 font-medium text-sm truncate">
                      {r.name}
                    </span>
                    <span className="font-bold text-teal-400 text-sm">
                      {r.total_points} pts
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Miembros tab */}
      {tab === "miembros" && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            Miembros ({members.length})
          </h2>
          <div className="space-y-2">
            {members.map((m) => (
              <div
                key={m.user_id}
                className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 border border-slate-700"
              >
                <img
                  src={m.user.url_image}
                  alt={m.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="flex-1 font-medium text-sm truncate">
                  {m.user.name}
                </span>
                {m.role === "admin" && (
                  <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <HiOutlineStar className="text-xs" />
                    Admin
                  </span>
                )}
                <span className="text-[10px] text-slate-500">
                  {moment(m.joined_at).format("DD MMM")}
                </span>
                {m.user_id === currentUserId ? (
                  <button
                    onClick={leaveGroup}
                    disabled={leaving}
                    className="text-xs text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-2 py-1 rounded transition-colors flex items-center gap-1"
                  >
                    <HiOutlineArrowRightOnRectangle className="text-xs" />
                    {leaving ? "Saliendo..." : "Salir"}
                  </button>
                ) : isAdmin && m.role !== "admin" ? (
                  <button
                    onClick={() => expelMember(m.user_id, m.user.name)}
                    className="text-xs text-slate-500 hover:text-red-400 hover:bg-red-400/10 p-1 rounded transition-colors"
                    title="Expulsar"
                  >
                    <HiOutlineXMark className="text-sm" />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info tab */}
      {tab === "info" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">{group.name}</h2>
            {group.description && (
              <p className="text-sm text-slate-400">{group.description}</p>
            )}
            {group.competition_name && (
              <span className="inline-block mt-2 text-xs bg-teal-900/40 text-teal-300 px-2 py-0.5 rounded-full">
                {group.competition_name}
              </span>
            )}
          </div>

          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-3">
            <p className="text-sm text-slate-400 font-medium">
              Código de invitación
            </p>
            <div className="flex items-center gap-2 bg-slate-900 rounded-lg px-3 py-2.5">
              <span className="text-xl font-mono font-bold tracking-widest text-teal-300 select-all flex-1">
                {group.invite_code}
              </span>
              <button
                onClick={copyInvite}
                className="bg-teal-600 hover:bg-teal-500 p-2 rounded-lg transition-colors"
                title="Copiar"
              >
                {copied ? (
                  <HiOutlineCheck className="text-green-200 text-base" />
                ) : (
                  <HiOutlineClipboard className="text-base" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-600 font-mono break-all select-all">
              {inviteLink}
            </p>
          </div>

          {isAdmin && (
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-2">
              <p className="text-sm text-slate-400 font-medium">
                {group.password ? "Contraseña del grupo" : "Grupo público"}
              </p>
              {group.password ? (
                <div className="flex items-center gap-2 bg-slate-900 rounded-lg px-3 py-2.5">
                  <span className="text-sm font-mono tracking-wider text-teal-300 flex-1 select-all">
                    {showPassword ? group.password : "••••••••"}
                  </span>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                    title={showPassword ? "Ocultar" : "Mostrar"}
                  >
                    {showPassword ? <HiOutlineEyeSlash className="text-base" /> : <HiOutlineEye className="text-base" />}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(group.password!);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                    title="Copiar"
                  >
                    {copied ? <HiOutlineCheck className="text-base text-green-400" /> : <HiOutlineClipboard className="text-base" />}
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Cualquier persona con el link puede unirse sin contraseña.
                </p>
              )}
            </div>
          )}

          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-sm text-slate-400 space-y-2">
            <div className="flex justify-between">
              <span>Competición</span>
              <span className="text-white">
                {group.competition_name || "Todas"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Miembros</span>
              <span className="text-white">{members.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Creado</span>
              <span className="text-white">
                {moment(group.created_at).format("DD MMM YYYY")}
              </span>
            </div>
          </div>

          {isAdmin && pendingRequests && pendingRequests.length > 0 && (
            <div className="bg-slate-800 rounded-xl p-4 border border-yellow-700/50 space-y-3">
              <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                <HiOutlineUsers className="text-base" />
                Solicitudes pendientes ({pendingRequests.length})
              </div>
              <div className="space-y-2">
                {pendingRequests.map((req: any) => (
                  <div key={req.id} className="flex items-center gap-3 bg-slate-900 rounded-lg p-2.5">
                    <img src={req.user.url_image} alt={req.user.name} className="w-7 h-7 rounded-full" />
                    <span className="flex-1 text-xs text-white truncate">{req.user.name}</span>
                    <span className="text-[10px] text-slate-500">{moment(req.created_at).fromNow()}</span>
                    <button
                      onClick={() => handleRequest(req.id, "approve")}
                      className="text-green-400 hover:text-green-300 bg-green-400/10 hover:bg-green-400/20 p-1 rounded transition-colors"
                      title="Aceptar"
                    >
                      <HiOutlineCheckBadge className="text-base" />
                    </button>
                    <button
                      onClick={() => handleRequest(req.id, "reject")}
                      className="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 p-1 rounded transition-colors"
                      title="Rechazar"
                    >
                      <HiOutlineNoSymbol className="text-base" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Link
        href="/groups"
        className="inline-block mt-4 text-xs text-slate-400 hover:text-white transition-colors"
      >
        &larr; Todos los grupos
      </Link>
    </div>
  );
}
