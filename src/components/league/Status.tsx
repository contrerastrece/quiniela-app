"use client";

import { useEffect, useState } from "react";
import LeagueTable from "./LeagueTable";
import "moment/locale/es";
import { getMatches, getSevenDays } from "@/api";
import moment from "moment";

const Status = () => {
  const hoy = moment().format("YYYY-MM-DD");
  const [day, setDay] = useState(hoy);
  const [dataMatches, setDataMatches] = useState([]);

  const days = getSevenDays();

  const handleClick = async (d: string) => {
    setDay(d);
    const data = await getMatches(d);
    setDataMatches(data);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getMatches(day);
      setDataMatches(data);
    };

    getData();
  }, [day]);

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
        {dataMatches[day]?.map((data) => (
          <div key={data.id}>
            <LeagueTable data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
