"use client";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { useEffect } from "react";

export default function HomePage() {
  const { getQuiniela } = useQuinielaStore();
  const { data } = useQuinielaStore();
  const { insertQuiniela } = useQuinielaStore();
  useEffect(() => {
    getQuiniela();
  }, []);
  console.log(data, "🚩");

  const handleInsertQuiniela = async () => {
    const newQuiniela = {
      score_home: 10,
      score_visit: 20,
      id_match: "1000",
      user_name: 'vcontreras'
    }; 
    await insertQuiniela(newQuiniela);
  };
  return (
    <div className="text-white">
      {JSON.stringify(data, null, 2)}

      <div className="">
        <h2 className="font-semibold">¡Bienvenido userName!</h2>
        <br></br>
        <button onClick={handleInsertQuiniela}>Insertar Quiniela</button>
        <p className="">
          ¡Es hora de poner a prueba tus habilidades de pronóstico futbolístico!
          En Quiniela App, tendrás la oportunidad de demostrar tu conocimiento
          del hermoso juego y competir contra otros aficionados en emocionantes
          quinielas.
        </p>
      </div>
    </div>
  );
}
