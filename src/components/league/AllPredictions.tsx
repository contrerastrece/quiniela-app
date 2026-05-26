"use client";
import { Ticket } from "./Ticket";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { useQuery } from "@tanstack/react-query";
import { SkeletonTicket } from "../ui/skeleton/SkeletonCard";

export const AllPredictions = () => {
  const getQuiniela = useQuinielaStore((s) => s.getQuiniela);
  const { data, isLoading } = useQuery({
    queryKey: ["quiniela"],
    queryFn: () => getQuiniela(),
    staleTime: 60 * 1000,
  });
  return (
    <div className="flex flex-col gap-4 my-3 max-w-md mx-auto">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <SkeletonTicket key={i} />)
      ) : (
        data?.map((q) => (
          <Ticket key={q.id_match} data={q} />
        ))
      )}
    </div>
  );
};
