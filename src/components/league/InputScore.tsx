"use client";
import React, { useState } from "react";
interface InputScoreProps {
  value: number;
  onChange: (value: number) => void;
}

export const InputScore = ({ value, onChange }: InputScoreProps) => {
  const [valor, setValor] = useState("");

  const handleInput = (event: any) => {
    // Limitar la entrada solo a dígitos
    const regex = /^[0-9\b]+$/;
    if (!regex.test(event.target.value)) {
      event.preventDefault();
      return;
    }

    // Limitar el valor a un solo dígito
    if (event.target.value.length > 1) {
      event.preventDefault();
      return;
    }

    // Actualizar el estado con el nuevo valor
    setValor(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Actualizar el estado solo si se ingresa un dígito válido
    const nuevoValor = event.target.value.replace(/\D/, ""); // Eliminar cualquier carácter que no sea un dígito
    if (nuevoValor.length <= 1) {
      setValor(nuevoValor);
    }
    onChange(parseInt(event.target.value));
  };

  return (
    <div>
      <input
        type="text"
        className="text-slate-300 text-5xl w-12 h-12 bg-slate-600 rounded-md text-center outline-none"
        placeholder="0"
        value={valor}
        onInput={handleInput}
        onChange={handleChange}
        maxLength={1}
        inputMode="numeric"
      />
    </div>
  );
};
