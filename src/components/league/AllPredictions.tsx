"use client";
import React from "react";
import { Ticket } from "./Ticket";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { useQuery } from "@tanstack/react-query";
import { Bounce, Fade } from "react-awesome-reveal";

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
      <Fade damping={0.2} delay={0.5} cascade>
        {data?.map((q) => (
          <Ticket key={q.id_match} data={q} />
        ))}
      </Fade>
    </div>
  );
};
