import Competition from "./Competition";
import { Match } from "@/types";
import Matches from "./Matches";
import { BtnSave } from "../ui/buttons/BtnSave";

interface Props{
  data: Match
}

const LeagueTable = ({ data }: Props) => {
  return (
    <div className="py-3 px-2 md:px-3 rounded-md flex flex-col bg-[rgb(40,46,58)] mb-2">
      <Competition data={data} />
      <Matches data={data} />
      {data.status === "TIMED" && <BtnSave data={data} />}
    </div>
  );
};

export default LeagueTable;
