import Image from "next/image";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
type TiketFakeType = {
  image_home: string;
  name_home: string;
  image_visit: string;
  name_visit: string;
  score_home: number;
  score_visit: number;
};

export const TicketFake = ({ data }: any) => {
  return (
    <div className="p-2 flex flex-col gap-2 rounded-md bg-slate-500/10 relative">
      <div className=" flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={data.image_home}
            width={25}
            height={25}
            alt={data.name_home}
          />
          <p className="text-xs text-white font-thin">{data.name_home}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-white font-thin">{data.score_home}</p>
          <p className="text-white">{data.result_home}</p>
          {data.score_home == data.result_home ? (
            <IoCheckmarkCircle className="text-teal-400" />
          ) : (
            <IoCloseOutline className="text-red-400" />
          )}
        </div>
      </div>
      <div className=" flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={data.image_visit}
            width={25}
            height={25}
            alt={data.name_visit}
          />
          <p className="text-xs text-white font-thin">{data.name_visit}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-white font-thin">{data.score_visit}</p>
          <p className="text-white">{data.result_visit}</p>
          {data.score_visit == data.result_visit ? (
            <IoCheckmarkCircle className="text-teal-400" />
          ) : (
            <IoCloseOutline className="text-red-400" />
          )}
        </div>
      </div>
      <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-400">
        {data.points > 0 ? (
          <p>+{data.points} pts.</p>
        ) : (
          <p className="text-red-400">{data.points} pt.</p>
        )}
      </div>
    </div>
  );
};
