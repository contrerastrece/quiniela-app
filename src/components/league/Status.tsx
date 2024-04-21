"use client";

import { useState } from "react";
import { Match } from "@/types";
import LeagueTable from "./LeagueTable";
import "moment/locale/es";
import { getSevenDays } from "@/api";
import moment from "moment";

interface Props {
  matchesList: Match[];
}

const Status = ({ matchesList }: Props) => {
  console.log(matchesList[7], "🚩");
  const hoy = moment().format("YYYY-MM-DD");
  const [day, setDay] = useState(hoy);
 
  const days = getSevenDays();

  // Función para agrupar los partidos por fecha
  const groupMatchesByDate = (matches ) => {
    // console.log(matches)
    const groupedMatches = {};
    matches.forEach((match) => {
      const date=moment(match.utcDate).format('YYYY-MM-DD')
      // const date = match.utcDate.split("T")[0]; // Obtener la fecha sin la hora
      if (!groupedMatches[date]) {
        groupedMatches[date] = [];
      }
      groupedMatches[date].push(match);
    });
    return groupedMatches;
  };

  // Obtener la lista de partidos agrupados por fecha
  const groupedMatches = groupMatchesByDate(matchesList);
  // console.log(groupedMatches['2024-04-17'].length);
  const [dataFilter,setDataFilter]=useState(groupedMatches[hoy]);
  // console.log(dataFilter.length);

  const handleClick = async (d: string) => {
    setDay(d);
    setDataFilter(groupedMatches[d]);
  };

  return (
    <div>
      <div className="flex space-x-4 mb-2 md:mb-4">
        {days.map((d) => (
          <button
            key={d.day}
            onClick={() => handleClick(d.other)}
            className={`px-2 py-1 text-primary text-sm rounded-md ${
              d.other === day
                ? "bg-teal-400 font-semibold"
                : "bg-slate-500 font-regular"
            }`}
          >
            <span className="uppercase">
              {d.weekday} {d.day}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full">
        {dataFilter.map((data) => (
          <div key={data.id}>
            <LeagueTable data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
