"use client";
import Competition from "./Competition";
import { Match } from "@/types";
import Matches from "./Matches";
import { FormMatch } from "./FormMatch";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { useQuery } from "@tanstack/react-query";

interface Props {
  data: Match;
}
const LeagueTable = ({ data }: Props) => {
  const getQuiniela = useQuinielaStore((state) => state.getQuiniela);
  const { data: predictionMatch } = useQuery({
    queryKey: ["dataPredicciton"],
    queryFn: async () => {
      return await getQuiniela();
    },
  });
  console.log(predictionMatch);
  const { status, id } = data;
  console.log(id);
  console.log(data);

  const existMatch = predictionMatch?.some((item) => item.id_match === id);
  console.log(existMatch);
  return (
    <div className="py-3 px-2 md:px-3 rounded-md flex flex-col bg-[rgb(40,46,58)] mb-2">
      <Competition data={data} />
      {data.status === "TIMED" ? (
        <FormMatch data={data} existMatch={existMatch!} />
      ) : (
        <Matches data={data} />
      )}
    </div>
  );
};

export default LeagueTable;
