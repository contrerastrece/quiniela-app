"use client";
import React from "react";
import { Ticket } from "./Ticket";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { useQuery } from "@tanstack/react-query";
import {  Fade } from "react-awesome-reveal";

export const AllPredictions = () => {
  const { getQuiniela } = useQuinielaStore();
  const { data } = useQuinielaStore();
  useQuery({
    queryKey: ["quiniela"],
    queryFn: async () => {
      return await getQuiniela();
    },
    staleTime: 60 * 1000,
  });
  return (
    <div className="flex flex-col gap-4 mx-2 my-3">
      <Fade  cascade direction="down">
        {data?.map((q) => (
          <Ticket key={q.id_match} data={q} />
        ))}
      </Fade>
    </div>
  );
};
