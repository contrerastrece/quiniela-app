"use client";
import React, { useState } from "react";
import LeagueTable from "./LeagueTable";
import { Match } from "@/types";
import { FilterStatus } from "../ui/filter/FilterStatus";
import { useQuery } from "@tanstack/react-query";
import { Zoom } from "react-awesome-reveal";

export const LeagueContent = ({ id }: { id: number }) => {
  const [state, setState] = useState("All");
  const getMatches = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leagues/api?id=${id}`);
    const data = await response.json();
    return data.matches;
  };
  const {
    isLoading,
    data: matches,
    error,
  } = useQuery({
    queryKey: ["dataMatchesByLeague"],
    queryFn: async () => {
      return await getMatches();
    },
    staleTime: 5 * 1000, //30 seconds para que pase a Stale ( )
  });

  let matchesFilter: Match[] = [];
  if (!isLoading) {
    switch (state) {
      case "Finished":
        matchesFilter = matches.filter((m: any) => m.status === "FINISHED");

        break;
      case "Live":
        matchesFilter = matches.filter((m: any) => m.status === "IN_PLAY");
        break;
      case "Upcoming":
        matchesFilter = matches.filter((m: any) => m.status === "TIMED");
        break;
      default:
        matchesFilter = matches;
        break;
    }
  }

  return (
    <div>
      <FilterStatus setState={setState} />
      {/*  */}
      {matchesFilter.length > 0 ? (
        <Zoom>
          {matchesFilter.map((match: Match) => (
            <LeagueTable key={match?.id} data={match} />
          ))}
        </Zoom>
      ) : (
        <>
          <p className="text-center pt-10 text-white ">
            Aún no hay partidos por jugarse para hoy
          </p>
        </>
      )}
    </div>
  );
};
