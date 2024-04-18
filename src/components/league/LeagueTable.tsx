import Competition from "./Competition";
import { matchesType } from "@/types";
import Matches from "./Matches";
import { BtnSave } from "../ui/buttons/BtnSave";

const LeagueTable = ({ data }: { data: matchesType }) => {
  return (
    <div className="py-3 px-2 md:px-3 rounded-md flex flex-col bg-[rgb(40,46,58)] mb-2">
      <Competition data={data} />
      <Matches data={data} />
      {data.status === "TIMED" && <BtnSave data={data} />}
    </div>
  );
};

export default LeagueTable;
