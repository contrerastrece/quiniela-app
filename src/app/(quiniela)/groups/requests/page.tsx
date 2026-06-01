"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import {
  HiOutlineInboxArrowDown,
  HiOutlineCheckBadge,
  HiOutlineNoSymbol,
  HiOutlineUserGroup,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

moment.locale("es");

export default function RequestsPage() {
  const queryClient = useQueryClient();

  const { data: requests, isLoading, refetch } = useQuery({
    queryKey: ["all-join-requests"],
    queryFn: () =>
      fetch("/groups/api/requests").then((r) => r.json()),
  });

  const reviewMutation = useMutation({
    mutationFn: async ({
      request_id,
      action,
    }: {
      request_id: string;
      action: "approve" | "reject";
    }) => {
      const res = await fetch("/groups/api/join-request/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_id, action }),
      });
      if (!res.ok) throw new Error("Error al procesar solicitud");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-join-requests"] });
    },
  });

  const groupedRequests = (requests as any[] ?? []).reduce(
    (acc: Record<string, any[]>, req: any) => {
      if (!acc[req.group_id]) acc[req.group_id] = [];
      acc[req.group_id].push(req);
      return acc;
    },
    {} as Record<string, any[]>
  );

  const groupCount = Object.keys(groupedRequests).length;
  const totalRequests = Array.isArray(requests) ? (requests as any[]).length : 0;

  return (
    <div className="text-white px-4 py-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/groups"
          className="text-slate-400 hover:text-white transition-colors"
        >
          <HiOutlineArrowLeft className="text-xl" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-teal-400 flex items-center gap-2">
            <HiOutlineInboxArrowDown className="text-2xl" />
            Bandeja de solicitudes
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {totalRequests === 0
              ? "No hay solicitudes pendientes"
              : `${totalRequests} solicitud${totalRequests !== 1 ? "es" : ""} en ${groupCount} grupo${groupCount !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700 animate-pulse"
            >
              <div className="h-4 bg-slate-700 rounded w-1/3 mb-3" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-700 rounded-full" />
                <div className="h-3 bg-slate-700 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : totalRequests === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700">
            <HiOutlineInboxArrowDown className="text-4xl text-slate-500" />
          </div>
          <h2 className="text-lg font-semibold text-slate-300 mb-2">
            Bandeja vacía
          </h2>
          <p className="text-sm text-slate-500 max-w-sm">
            Cuando alguien solicite unirse a uno de tus grupos, las
            solicitudes aparecerán aquí para que las revises.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(Object.entries(groupedRequests) as [string, any[]][]).map(
            ([groupId, groupRequests]) => (
              <div key={groupId}>
                <div className="flex items-center gap-2 mb-3">
                  <HiOutlineUserGroup className="text-slate-400 text-lg" />
                  <Link
                    href={`/groups/${groupId}`}
                    className="font-semibold text-white hover:text-teal-400 transition-colors"
                  >
                    {groupRequests[0].group_name}
                  </Link>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                    {groupRequests.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {groupRequests.map((req: any) => (
                    <div
                      key={req.id}
                      className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 border border-slate-700"
                    >
                      <img
                        src={req.user.url_image}
                        alt={req.user.name}
                        className="w-9 h-9 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {req.user.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {moment(req.created_at).fromNow()}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          reviewMutation.mutate({
                            request_id: req.id,
                            action: "approve",
                          })
                        }
                        disabled={reviewMutation.isPending}
                        className="text-green-400 hover:text-green-300 bg-green-400/10 hover:bg-green-400/20 p-2 rounded-lg transition-colors disabled:opacity-50"
                        title="Aprobar"
                      >
                        <HiOutlineCheckBadge className="text-lg" />
                      </button>
                      <button
                        onClick={() =>
                          reviewMutation.mutate({
                            request_id: req.id,
                            action: "reject",
                          })
                        }
                        disabled={reviewMutation.isPending}
                        className="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 p-2 rounded-lg transition-colors disabled:opacity-50"
                        title="Rechazar"
                      >
                        <HiOutlineNoSymbol className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
