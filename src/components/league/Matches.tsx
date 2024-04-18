import Image from "next/image";
import { matchesType } from "@/types";
import { InputScore } from "./InputScore";

const Matches = ({ data }: { data: matchesType }) => {
  const getDate = new Date(data?.utcDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log(data);
  // console.log(getDate)
  return (
    <div className="flex flex-col gap-2 min-w-[20rem] max-w-lg">
      {data.status === "IN_PLAY" || data.status === "PAUSED" ? (
        <p className="flex gap-2 items-center  text-end text-white text-xs ">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          En vivo {data.status === "PAUSED" ? "(entretiempo)" : ""}
        </p>
      ) : data.status === "FINISHED" ? (
        <p className="text-white text-xs">Finalizado</p>
      ) : (
        <p>
          <p className="py-1 text-teal-400 text-xs">
            {getDate}
          </p>
        </p>
      )}

      <div className="grid grid-cols-3 ">
        {/* Data Local */}
        <div className="flex flex-col items-center gap-1">
          <Image
            src={data?.homeTeam?.crest!}
            alt={data?.homeTeam?.name!}
            className="object-contain bg-white rounded-md p-1"
            width={50}
            height={50}
          />
          <p className="w-full text-xs text-white text-wrap text-center ">
            {data?.homeTeam?.shortName}
          </p>
        </div>
        {/* Marcador */}
        <div className="px-2 m-auto flex   items-center  gap-2">
          {data?.status === "IN_PLAY" ||
          data?.status === "FINISHED" ||
          data?.status === "PAUSED" ? (
            <div className="flex flex-col">
              {data?.status === "FINISHED" ? (
                <>
                  <p className="text-xs font-thin">Finalizado</p>
                </>
              ) : (
                <p className="text-xs text-center font-thin text-teal-400">
                  1er Tiempo
                  <br />
                  {data?.score?.halfTime?.home}:{data?.score?.halfTime?.away}
                </p>
              )}
              <p
                className={`py-1 ${
                  data.status === "FINISHED" ? "text-white" : "text-teal-400"
                } text-2xl text-center`}
              >
                {data?.score?.fullTime.home} : {data.score?.fullTime.away}
              </p>
            </div>
          ) : (
            <>
              {data.status === "POSTPONED" ? (
                <p className="text-xs text-white">Pospuesto</p>
              ) : (
                <div className="flex flex-col-reverse">
                  <div className="flex gap-2 items-center justify-center">
                    {data.status === "TIMED" && <InputScore />}
                    <span className="text-slate-400 text-xl">:</span>
                    {data.status === "TIMED" && <InputScore />}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Data Visitante */}
        <div className=" flex flex-col items-center gap-1">
          <Image
            src={data?.awayTeam?.crest!}
            alt={data?.awayTeam?.name!}
            width={50}
            height={50}
            className="object-cover bg-white rounded-md  p-1"
          />
          <p className="w-full text-xs text-center text-white text-wrap">
            {data?.awayTeam?.shortName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Matches;
