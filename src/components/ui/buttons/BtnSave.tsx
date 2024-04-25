"use client";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { Match } from "@/types";
import React from "react";

interface BtnSaveProps {
  data: Match;
  homeScore: number;
  awayScore: number;
}
export const BtnSave = ({ data, homeScore, awayScore }: BtnSaveProps) => {
  const { insertQuiniela } = useQuinielaStore();
  const { id, homeTeam, awayTeam } = data;

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const quiniela = {
      image_home: homeTeam.crest,
      image_visit: awayTeam.crest,
      name_home: homeTeam.shortName,
      name_visit: awayTeam.shortName,
      score_home: homeScore,
      score_visit: awayScore,
      user_name: "victor",
      id_match: id.toString(),
    };
    console.log(data);
    await insertQuiniela(quiniela);
  };
  return (
    <button
      className="bg-teal-600 text-white rounded-md py-2 mt-3"
      onClick={(e) => handleSave(e)}
    >
      Guardar
    </button>
  );
};
