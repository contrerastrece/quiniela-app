'use client'
import React, { useState } from "react";

export const InputScore = () => {
  const [valor, setValor] = useState("");

  const handleInput = (event:any) => {
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

  const handleChange = (event:any) => {
    // Actualizar el estado solo si se ingresa un dígito válido
    const nuevoValor = event.target.value.replace(/\D/, ""); // Eliminar cualquier carácter que no sea un dígito
    if (nuevoValor.length <= 1) {
      setValor(nuevoValor);
    }
  };
  
  return (
    <div>
      <input
        type="text"
        className="text-slate-300 text-5xl w-14 h-14 bg-slate-600 rounded-md text-center outline-none"
        placeholder="-"
        value={valor}
        onInput={handleInput}
        onChange={handleChange}
        maxLength={1}
        inputMode="numeric"
      />
    </div>
  );
};
