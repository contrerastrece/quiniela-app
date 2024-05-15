"use client";

import { useState } from "react";
import LeagueTable from "./LeagueTable";
import "moment/locale/es";
import { getMatches, getSevenDays } from "@/api";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../ui/loader/Loading";
import { Bounce, Fade, Zoom } from "react-awesome-reveal";
import { FilterStatus } from "../ui/filter/FilterStatus";
import { Match } from "@/types";

const Status = () => {
  const hoy = moment().format("YYYY-MM-DD");
  const [day, setDay] = useState(hoy);
  const [state, setState] = useState("All");
  const days = getSevenDays();
  const handleClick = async (d: string) => {
    setDay(d);
  };
  const {
    isLoading,
    data: matches,
    error,
  } = useQuery({
    queryKey: ["dataMatches", day],
    queryFn: async () => {
      return await getMatches(day);
    },
    staleTime: 30 * 1000, //30 seconds para que pase a Stale ( )
  });

  let matchesFilter: Match[] = [];
  if (!isLoading) {
    switch (state) {
      case "Finished":
        matchesFilter = matches![day].filter((m) => m.status === "FINISHED");

        break;
      case "Live":
        matchesFilter = matches![day].filter((m) => m.status === "IN_PLAY");
        break;
      case "Upcoming":
        matchesFilter = matches![day].filter((m) => m.status === "TIMED");
        break;
      default:
        matchesFilter = matches![day];
        break;
    }
  }

  return (
    <div>
      <FilterStatus setState={setState} />
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
      <div className="w-full border border-white">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {matchesFilter.length > 0 ? (
              <Zoom>
                {matchesFilter.map((match) => (
                  <LeagueTable data={match} key={match.id} />
                ))}
              </Zoom>
            ) : (
              <p className="text-center text-gray-400 mt-20 ">
                No hay datos ...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Status;
