'use client'
import React, { useState } from "react";


export const FilterStatus = ({setState}:{setState:any}) => {
  const [status, setStatus] = useState('All')
  const statusList = [
    {
      name: "All",
      state:''
    },
    {
      name: "Finished",
      state:'FINISHED'
    },
    {
      name: "Live",
      state:'IN_LIVE'
    },
    {
      name: "Upcoming",
      state:'TIMED'
    },
  ];
  const handleClick=(s:string)=>{
    setStatus(s)
    setState(s)
  }

  return (
    <div className="flex gap-2 my-2">
      {statusList.map((s) => (
        <button
          key={s.name}
          onClick={()=>handleClick(s.name)}
          className={`px-2 py-1 text-white rounded-md transition-colors ${
            s.name === status
              ? "bg-teal-400 font-semibold hover:bg-teal-500"
              : "bg-slate-500 font-regular hover:bg-slate-600"
          }`}
        >
          <span className="uppercase text-xs flex flex-col gap-1">
            <p>{s.name}</p>
          </span>
        </button>
      ))}
    </div>
  );
};
