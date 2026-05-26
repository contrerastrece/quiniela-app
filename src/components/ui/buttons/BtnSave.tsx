"use client";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { Match } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BtnSaveProps {
  data: Match;
  homeScore: number;
  awayScore: number;
  existMatch: boolean;
}

export const BtnSave = ({
  data,
  homeScore,
  awayScore,
  existMatch,
}: BtnSaveProps) => {
  const { insertQuiniela } = useQuinielaStore();
  const { id, homeTeam, awayTeam } = data;

  const quiniela = {
    // id_user: user!.id,
    image_home: homeTeam.crest,
    image_visit: awayTeam.crest,
    name_home: homeTeam.shortName,
    name_visit: awayTeam.shortName,
    score_home: homeScore,
    score_visit: awayScore,
    id_match: id.toString(),
  };

  const queryClient = useQueryClient();
  // console.log(objFilter?.id_match,objFilter?.score_home)
  const mutation = useMutation({
    mutationFn: () => insertQuiniela(quiniela),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predictionsUser"] });
      queryClient.invalidateQueries({ queryKey: ["quiniela"] });
    },
  });
  return (
    <button
      className={`bg-teal-600 text-white transition-colors duration-75 rounded-md py-2 mt-3  ${
        existMatch ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-500"
      }`}
      onClick={(e) => { e.preventDefault(); mutation.mutate(); }}
      disabled={existMatch}
    >
      {existMatch ? "Guardado" : "Guardar"}
    </button>
  );
};
