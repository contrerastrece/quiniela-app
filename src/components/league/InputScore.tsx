"use client";
import React, { useState } from "react";

interface InputScoreProps {
  value: number;
  onChange: (value: number) => void;
  scoreUser?: number;
  existMatch: boolean;
}

export const InputScore = ({ value, onChange, scoreUser, existMatch }: InputScoreProps) => {
  const [valor, setValor] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(0, 1);
    setValor(digit);
    if (digit) onChange(Number(digit));
  };
  return (
    <div>
      <input
        type="text"
        className="text-slate-300 text-5xl w-12 h-12 bg-slate-600 rounded-md text-center outline-none"
        placeholder={scoreUser != null ? String(scoreUser) : "0"}
        value={valor}
        onChange={handleChange}
        maxLength={1}
        inputMode="numeric"
        disabled={existMatch}
      />
    </div>
  );
};
