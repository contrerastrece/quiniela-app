"use client";

import { useState } from "react";
import LeagueTable from "./LeagueTable";
import "moment/locale/es";
import { getMatches, getSevenDays } from "@/api";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../ui/loader/Loading";
import { useUserStore } from "@/store/user/userStore";
import { Bounce, Fade } from "react-awesome-reveal";

const Status = ({ user }: { user: any }) => {
  const hoy = moment().format("YYYY-MM-DD");
  const [day, setDay] = useState(hoy);
  // console.log(user)
  const setUser = useUserStore((state) => state.setUser);
  setUser(user);
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

  // console.log(matches);

  

  return (
    <div>
      <div className="flex gap-2 mb-2 md:mb-4 overflow-x-auto py-2  p-1 ">
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
            <span className="uppercase text-xs flex flex-col gap-1">
              <p>{d.weekday}</p>
              <p>{d.day}</p>
            </span>
          </button>
        ))}
      </div>

      <div className="w-full">
        {isLoading ? (
          <Loading />
        ) : (
          <Fade cascade>
            {matches![day]?.map((match) => (
              <LeagueTable data={match} key={match.id} />
            ))}
          </Fade>
        )}
      </div>
    </div>
  );
};

export default Status;
