"use client";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { Result } from "./Result";
import { getResultByMatch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { IoCheckmark, IoCloseCircle } from "react-icons/io5";
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
  // console.log(data);

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

  // console.log(result);

  return (
    <div key={data.id_match} className="flex  flex-col gap-1 px-5">
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
          <p>{data.name_home}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-thin">{data.score_home}</p>
          <p>{result?.score?.fullTime?.home}</p>
          {result?.status === "FINISHED" && (
            <>
              {data.score_home == result?.score?.fullTime?.home ? (
                <IoCheckmarkCircle className="text-green-500" />
              ) : (
                <IoCloseCircle className="text-red-500" />
              )}
            </>
          )}
        </div>
      </div>
      <div className=" flex justify-between">
        <div className=" flex gap-2">
          <Image
            src={data.image_visit!}
            width={15}
            height={15}
            alt=""
            className="aspect-auto  object-contain"
          />
          <p>{data.name_visit}</p>
        </div>
        <div className=" flex gap-2">
          <p className="font-thin">{data.score_visit}</p>
          <p>{result?.score?.fullTime?.away}</p>
          {result?.status === "FINISHED" && (
            <>
              {data.score_visit === result?.score?.fullTime?.away ? (
                <IoCheckmarkCircle className="text-green-500" />
              ) : (
                <IoCloseCircle className="text-red-500" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
