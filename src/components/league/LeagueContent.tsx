"use client";
import { useState, useCallback } from "react";
import LeagueTable from "./LeagueTable";
import { Match } from "@/types";
import { FilterStatus } from "../ui/filter/FilterStatus";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "../ui/skeleton/SkeletonCard";

export const LeagueContent = ({ id }: { id: number }) => {
  const [state, setState] = useState("Todos");
  const getMatches = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leagues/api?id=${id}`
    );
    const data = await response.json();
    return data.matches;
  }, [id]);
  const { isLoading, data: matches } = useQuery({
    queryKey: ["dataMatchesByLeague", id],
    queryFn: getMatches,
    placeholderData: (prev) => prev,
  });

  let matchesFilter: Match[] = [];
  if (!isLoading) {
    switch (state) {
      case "Finalizados":
        matchesFilter = matches.filter((m: any) => m.status === "FINISHED");
        break;
      case "En Vivo":
        matchesFilter = matches.filter((m: any) => m.status === "IN_PLAY");
        break;
      case "Próximos":
        matchesFilter = matches.filter((m: any) => m.status === "TIMED");
        break;
      default:
        matchesFilter = matches;
        break;
    }
  }

  return (
    <div>
      <FilterStatus status={state} setState={setState} />
      {/*  */}
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
      ) : (
        <>
          {matchesFilter.length != 0 ? (
            matchesFilter.map((match: Match) => (
              <LeagueTable key={match?.id} data={match} />
            ))
          ) : (
            <p className="text-center pt-10 text-white ">
              No hay partidos programados para esta fecha
            </p>
          )}
        </>
      )}
    </div>
  );
};
