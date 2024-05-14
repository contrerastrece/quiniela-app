"use client";
import Competition from "./Competition";
import { Match } from "@/types";
import Matches from "./Matches";
import { FormMatch } from "./FormMatch";

interface Props {
  data: Match;
}
const LeagueTable = ({ data }: Props) => {
  return (
    <div className="py-3 px-2 md:px-3 rounded-md flex flex-col bg-[rgb(40,46,58)] mb-2">
      <Competition data={data} />
      {data.status === "TIMED" ? (
        <FormMatch data={data} />
      ) : (
        <Matches data={data} />
      )}
    </div>
  );
};

export default LeagueTable;
