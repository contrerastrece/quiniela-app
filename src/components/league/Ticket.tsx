"use client";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { calculatePoints, getResultByMatch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { IoCloseOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
interface ticketProps {
  id: number;
  created_at: string;
  score_home: number;
  score_visit: number;
  user_name: string;
  id_match: string;
  name_home: string;
  name_visit: string;
  image_home: string | null;
  image_visit: string | null;
}

export const Ticket = ({ data }: any) => {
  const {
    isLoading,
    data: result,
    error,
  } = useQuery({
    queryKey: ["result", data.id_match],
    queryFn: async () => {
      return await getResultByMatch(data.id_match);
    },
  });

  const calculateResultFinal = (scoreHome: number, scoreVisit: number) => {
    let final = "";
    if (scoreHome === scoreVisit) {
      final = "Empate";
    } else if (scoreHome > scoreVisit) {
      final = "Local";
    } else {
      final = "Visita";
    }
    return final;
  };

  // console.log(result);
  let pronostic = {
    score_home: data.score_home,
    score_visit: data.score_visit,
    result: calculateResultFinal(data.score_home, data.score_visit),
  };

  let resultMatch = {
    score_homeTeam: result?.score?.fullTime.home,
    score_awayTeam: result?.score?.fullTime.away,
    result: calculateResultFinal(
      result?.score?.fullTime.home,
      result?.score?.fullTime.away
    ),
  };

  const { data: points } = useQuery({
    queryKey: ["Points", result?.id],
    queryFn: async () => {
      return await calculatePoints(pronostic, resultMatch);
    },
  });
  return (
    <div className="flex  flex-col gap-1 relative bg-slate-500/10 p-2 rounded-md ">
      <p className="text-xs font-thin">
        {moment(data.created_at).format("YYYY-MM-DD HH:mm:ss ")}
      </p>
      <div className="flex justify-between">
        <div className=" flex gap-2">
          <Image
            src={data.image_home!}
            width={15}
            height={15}
            alt=""
            className="aspect-auto  object-contain"
          />
          <p
            className={
              result?.score?.winner === "HOME_TEAM"
                ? "font-semibold"
                : "font-extralight"
            }
          >
            {data.name_home} {data.score_home > data.score_visit ? "•" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="font-thin">{data.score_home}</p>
          <p>{result?.score?.fullTime?.home}</p>
          {result?.status === "FINISHED" && (
            <div className=" flex items-center justify-center">
              {data.score_home == result?.score?.fullTime?.home ? (
                <IoCheckmarkCircle className="text-green-500" />
              ) : (
                <IoCloseOutline className="text-red-400" />
              )}
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-between rounded-md">
        <div className=" flex gap-2">
          <Image
            src={data.image_visit!}
            width={15}
            height={15}
            alt=""
            className="aspect-auto  object-contain"
          />
          <p
            className={
              result?.score?.winner === "AWAY_TEAM"
                ? "font-semibold"
                : "font-extralight"
            }
          >
            {data.name_visit} {data.score_home < data.score_visit ? "•" : ""}
          </p>
        </div>
        <div className=" flex gap-2">
          <p className="font-thin">{data.score_visit}</p>
          <p>{result?.score?.fullTime?.away}</p>
          {result?.status === "FINISHED" && (
            <div className=" flex items-center justify-center">
              {data.score_visit === result?.score?.fullTime?.away ? (
                <IoCheckmarkCircle className="text-green-500 " />
              ) : (
                <IoCloseOutline className="text-red-400" />
              )}
            </div>
          )}
        </div>
      </div>
      {result?.status === "FINISHED" && (
        <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-400">
          {points! > 0 ? (
            <p>+{points} pts.</p>
          ) : (
            <p className="text-red-400">{points} pts.</p>
          )}
        </div>
      )}
    </div>
  );
};
