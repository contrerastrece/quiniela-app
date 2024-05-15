"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Zoom } from "react-awesome-reveal";

export const CardCompetition = ({ data }: { data: any }) => {
  return (
    <Zoom triggerOnce>
      <Link
        href={`leagues/${data.id}`}
        className="border border-dashed rounded-md p-2 flex flex-col items-center justify-center bg-slate-800 hover:bg-slate-800/50 transition-all duration-75 gap-2 min-w-28"
      >
        <Image
          src={data.emblem}
          width={100}
          height={100}
          alt={data.name}
          className="bg-white rounded-md p-1 object-contain w-24 h-24 aspect-square"
        />
        <p className="text-center text-white uppercase text-xs font-semibold truncate w-full">
          {data.name}
        </p>
      </Link>
    </Zoom>
  );
};
