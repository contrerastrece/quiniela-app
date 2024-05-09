"use client";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { getResultByMatch } from "@/api";
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
  // console.log(data);

  return (
    <>
      <div className="flex  flex-col gap-1 relative bg-slate-500/10 p-2 rounded-md ">
        <p className="text-xs font-thin">
          {moment(data.created_at).format("YYYY-MM-DD HH:mm:ss ")}
        </p>
        <div className="flex justify-between">
          <div className=" flex gap-2 items-center">
            <Image
              src={data.image_home!}
              width={20}
              height={20}
              alt=""
              className="aspect-square object-contain h-5 w-auto "
            />
            <p
              className={
                data.result_home > data.result_visit
                  ? "font-semibold"
                  : "font-extralight"
              }
            >
              {data.name_home} {data.score_home > data.score_visit ? "•" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-thin text-center w-4 ">
              {data.score_home}
            </p>
            <p className="text-center w-4 ">{data.result_home}</p>
            {data.status_match === "FINISHED" && (
              <div className=" flex items-center justify-center">
                {data.score_home == data.result_home ? (
                  <IoCheckmarkCircle className="text-green-500" />
                ) : (
                  <IoCloseOutline className="text-red-400" />
                )}
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-between rounded-md">
          <div className=" flex gap-2 items-center">
            <Image
              src={data.image_visit!}
              width={16}
              height={16}
              alt=""
              className="aspect-square  object-contain w-auto h-5 "
            />
            <p
              className={
                data.result_home < data.resut_visit
                  ? "font-semibold"
                  : "font-extralight"
              }
            >
              {data.name_visit} {data.score_home < data.score_visit ? "•" : ""}
            </p>
          </div>
          <div className=" flex gap-2">
            <p className="font-thin  w-4 text-center">
              {data.score_visit}
            </p>
            <p className=" w-4 text-center">{data.result_visit}</p>
            {data.status_match === "FINISHED" && (
              <div className=" flex items-center justify-center">
                {data.score_visit === data.result_visit ? (
                  <IoCheckmarkCircle className="text-green-500 " />
                ) : (
                  <IoCloseOutline className="text-red-400" />
                )}
              </div>
            )}
          </div>
        </div>

        {data.status_match === "FINISHED" && (
          <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            {data.points > 0 ? (
              <span className="text-teal-400">
                + {data.points} {data.points < 2 ? "pto." : "pts."}
              </span>
            ) : (
              <span className="text-red-400">
                {data.points} {data.points < 2 ? "pto." : "pts."}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};
