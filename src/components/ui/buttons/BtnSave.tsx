"use client";
import { matchesType } from "@/types";
import React from "react";

export const BtnSave = ({ data }: { data: matchesType }) => {
  const handleSave = () => {
    console.log(data.id);
  };
  return (
    <button
      className="bg-teal-600 text-white rounded-md py-2 mt-3"
      onClick={handleSave}
    >
      Guardar
    </button>
  );
};
