"use client";
import { Ticket } from "@/components";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { useQuery } from "@tanstack/react-query";

const PredictionsPage = () => {
  const { getQuiniela } = useQuinielaStore();
  const { data } = useQuinielaStore();
  const { isLoading, data: quiniela } = useQuery({
    queryKey: ["quiniela"],
    queryFn: async () => {
      return await getQuiniela();
    },
    staleTime: 60 * 1000,
  });

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold my-3">Mis Predicciones</h2>
      <div className="flex flex-col gap-3 mx-2">
        {data?.map((q) => (
          <Ticket key={q.id_match} data={q} />
        ))}
      </div>
    </div>
  );
};

export default PredictionsPage;
