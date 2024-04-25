"use client";

import React from "react";
import { getResultByMatch } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface resultProps {
  id: string;
}
export const Result = ({ id }: resultProps) => {
  // const data = await getResultByMatch(id);

  const { isLoading, data, error } = useQuery({
    queryKey: ["result", id],
    queryFn: async () => {
      return await getResultByMatch(id);
    },
  });
  // const {status,score}=data;
  // console.log(isLoading);
  // console.log(data);
  // console.log(data?.score);
  // console.log(error?.message);
  return (
    <div className=" flex flex-col">
      {data?.score?.fullTime?.home}
      <br />
      {data?.score?.fullTime?.away}
    </div>
  );
};
