"use client";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { Match } from "@/types";
import React from "react";

export const  BtnSave = ({ data }: { data: Match }) => {
  const { insertQuiniela } = useQuinielaStore();

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const quiniela = {
      score_home: 1,
      score_visit: 2,
      user_name:'victor',
      id_match: data.id.toString(),
    };
    console.log(data);
    await insertQuiniela(quiniela);
  };
  return (
    <button
      className="bg-teal-600 text-white rounded-md py-2 mt-3"
      onClick={(e)=>handleSave(e)}
    >
      Guardar
    </button>
  );
};
