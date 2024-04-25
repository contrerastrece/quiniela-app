import Image from "next/image";
import { Match } from "@/types";
import { InputScore } from "./InputScore";
import moment from "moment";
import { Card } from "../ui/card/Card";
import { LiveDot } from "../ui/dot/LiveDot";

const Matches = ({ data }: { data: Match }) => {
  const { awayTeam, homeTeam, status, score } = data;

  const getStatusText = (status: string) => {
    switch (status) {
      case "IN_PLAY":
        return "En vivo";
      case "PAUSED":
        return "Entretiempo";
      case "FINISHED":
        return "Finalizado";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-2 min-w-[20rem] max-w-lg">
      <p className="text-xs flex gap-2 font-thin text-center items-center">
        {(data.status === "IN_PLAY" || data.status === "PAUSED") && <LiveDot />}
        {getStatusText(data.status)}
        {data.status === "IN_PLAY" || data.status === "PAUSED" ? (
          <>{score.halfTime.home == null ? " (1er tiempo)" : " (2do Tiempo)"}</>
        ) : (
          ""
        )}
      </p>

      <div className="grid grid-cols-3 ">
        {/* Card Local */}
        <Card url={homeTeam.crest!} shortName={homeTeam.shortName} />

        {/* Marcador */}
        <div className="px-2 m-auto flex   items-center  gap-2">
          {data?.status === "IN_PLAY" ||
          data?.status === "FINISHED" ||
          data?.status === "PAUSED" ? (
            <div className="flex flex-col">
              <p
                className={`py-1 ${
                  data.status === "FINISHED" ? "text-white" : "text-teal-400"
                } text-2xl text-center`}
              >
                <>
                  {data?.score?.duration === "REGULAR" ? (
                    <div className="flex gap-2 justify-center">
                      <p>{data?.score?.fullTime.home}</p>:
                      <p>{data.score?.fullTime.away}</p>{" "}
                    </div>
                  ) : (
                    <div className=" flex  flex-col items-center justify-center gap-2">
                      <div className="flex gap-2">
                        <p className="text-center">
                          <span className="text-xs align-middle font-thin">
                            ({data?.score?.penalties?.home})
                          </span>
                          {data?.score?.regularTime?.home}
                        </p>
                        :
                        <p>
                          {data.score?.regularTime?.away}
                          <span className="text-xs align-middle font-thin ">
                            ({data?.score?.penalties?.away})
                          </span>
                        </p>
                      </div>
                      <span className="text-xs bg-slate-700 px-2 font-thin rounded-sm py-[1px]  text-center">
                        Global.
                        {data?.score?.fullTime.home} :{" "}
                        {data?.score?.fullTime.away}
                      </span>
                    </div>
                  )}
                </>
              </p>
            </div>
          ) : (
            <>
              {data.status === "POSTPONED" && (
                <>
                  <p className="text-xs text-white">Pospuesto</p>
                </>
              )}
            </>
          )}
        </div>

        {/* Card Visitante */}
        <Card url={awayTeam.crest!} shortName={awayTeam.shortName} />
      </div>
    </div>
  );
};

export default Matches;
