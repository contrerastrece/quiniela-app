import { Match } from "@/types";
import Image from "next/image";

const Competition = ({ data }: { data: Match }) => {
  const nd = new Date(data?.utcDate);
  // console.log(nd)
  const dateConvert = nd.toDateString();

  // console.log(dateConvert)
  // console.log(data)
  return (
    <div className="mb-4 flex justify-between items-center px-4 py-1 bg-slate-600 hover:bg-slate-700 rounded-md">
      <div className="flex space-x-4">
        <Image
          src={data?.competition.emblem}
          alt={data?.competition.name}
          width={25}
          height={25}
          className="aspect-auto border border-red-600 bg-white rounded-md p-[2px]"
        />
        <p className="text-sm text-teal-400">{data?.competition.name}</p>
      </div>
      <p className="text-xs md:text-sm">{dateConvert}</p>
    </div>
  );
};

export default Competition;
