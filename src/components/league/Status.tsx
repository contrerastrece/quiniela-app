"use client";

import { useState } from "react";
import LeagueTable from "./LeagueTable";
import { getMatches, getSevenDays } from "@/api";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { FilterStatus } from "../ui/filter/FilterStatus";
import { Match } from "@/types";
import { SkeletonCard } from "../ui/skeleton/SkeletonCard";

const Status = () => {
  const hoy = moment().format("YYYY-MM-DD");
  const [day, setDay] = useState(hoy);
  const [state, setState] = useState("Todos");
  const days = getSevenDays();
  const handleClick = (d: string) => setDay(d);
  const { isLoading, data: matches } = useQuery({
    queryKey: ["dataMatches", day],
    queryFn: () => getMatches(day),
    staleTime: 60 * 1000,
  });

  let matchesFilter: Match[] = [];
  if (!isLoading && matches && matches[day]) {
    switch (state) {
      case "Finalizados":
        matchesFilter = matches![day].filter((m) => m.status === "FINISHED");
        break;
      case "En Vivo":
        matchesFilter = matches![day].filter((m) => m.status === "IN_PLAY");
        break;
      case "Próximos":
        matchesFilter = matches![day].filter((m) => m.status === "TIMED");
        break;
      default:
        matchesFilter = matches![day];
        break;
    }
  }

  return (
    <div>
      <FilterStatus status={state} setState={setState} />
      {/* Select Day */}
      <div className="flex gap-3 my-2 md:mb-4 overflow-x-auto py-2">
        {days.map((d) => (
          <button
            key={d.day}
            onClick={() => handleClick(d.other)}
            className={`px-2 py-1 text-primary rounded-md transition-colors ${
              d.other === day
                ? "bg-teal-400 font-semibold hover:bg-teal-500"
                : "bg-slate-500 font-regular hover:bg-slate-600"
            }`}
          >
            <span className="uppercase text-xs flex flex-col gap-1 tracking-wide ">
              <p>{d.weekday}</p>
              <p>{d.day}</p>
            </span>
          </button>
        ))}
      </div>

      {/* Show Matches */}
      <div className="w-full">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            {matchesFilter && matchesFilter.length > 0 ? (
              matchesFilter.map((match) => (
                <LeagueTable data={match} key={match.id} />
              ))
            ) : (
              <p className="text-center text-gray-400 mt-20 ">
                No hay partidos programados para esta fecha
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Status;
