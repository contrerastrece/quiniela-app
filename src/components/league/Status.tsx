"use client";

import { useEffect, useState } from "react";
import { matchesType } from "@/types";
import LeagueTable from "./LeagueTable";
// import "moment/locale/es";
import { getSevenDays } from "@/api";
import moment from "moment";
import { useMatchStore } from "@/store/match/matchStore";

const Status = () => {
  const hoy = moment().format("YYYY-MM-DD");
  const [day, setDay] = useState(hoy);
  const [dataMatch, setDataMatch] = useState([]);
  const days = getSevenDays();

  const data = useMatchStore((state) => state.data);
  const getMatches = useMatchStore((state) => state.getMatches);
console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await getMatches(hoy);
        setDataMatch(matchData); // Asignar los datos de los partidos a dataMatch
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
      }
    };

    fetchData(); // Llamar a fetchData al montar el componente o cuando cambie 'day'
  }, [getMatches, hoy]); // Establecer 'day' como dependencia para que se ejecute cuando cambie

  const handleClick = async (d:string) => {
    setDay(d);
    try {
      const matchData = await getMatches(d);
      setDataMatch(matchData);
    } catch (error) {
      console.error("Error al obtener los partidos:", error);
    }
  };
  console.log(dataMatch);

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
        {/* {dataMatch
          ? dataMatch.map((data) => (
              <div key={data.id}>
                <LeagueTable data={data} />
              </div>
            ))
          : null} */}
      </div>
    </div>
  );
};

export default Status;
