"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Zoom } from "react-awesome-reveal";
import { GiCheckeredFlag } from "react-icons/gi";

export const CardDefault = () => {
  return (
    <Zoom>
      <Link
        href={`/`}
        className="border border-dashed rounded-md p-2 flex flex-col items-center justify-center bg-slate-900 hover:bg-slate-800/50 transition-all duration-75 gap-2 min-w-28"
      >
        <GiCheckeredFlag size={100} className="bg-white rounded-md p-1 object-contain w-24 h-24 aspect-square" />
        <p className="text-white uppercase text-xs font-semibold w-full truncate text-center">All Competitions</p>
      </Link>
    </Zoom>
  );
};
