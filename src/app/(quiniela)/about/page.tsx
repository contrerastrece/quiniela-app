import { TicketFake } from "@/components/league/TicketFake";
import React from "react";

const AboutPage = () => {
  const data = [
    {
      image_home: "https://crests.football-data.org/5.svg",
      name_home: "Bayern M.",
      score_home: 2,
      result_home: 1,
      image_visit: "https://crests.football-data.org/86.png",
      name_visit: "Real Madrid",
      score_visit: 1,
      result_visit: 1,
      points: 1,
    },
    {
      image_home: "https://crests.football-data.org/5.svg",
      name_home: "Bayern M.",
      score_home: 3,
      result_home: 3,
      image_visit: "https://crests.football-data.org/86.png",
      name_visit: "Real Madrid",
      score_visit: 1,
      result_visit: 1,
      points: 4,
    },
  ];
  return (
    <div className="flex items-center justify-center ">
      <div className=" shadow-md rounded px-8 pt-4 pb-4 flex flex-col max-w-2xl mx-2  bg-slate-800 my-4">
        <div className="mb-4 flex flex-col gap-3">
          <h2 className="text-2xl font-bold mb-2 text-white">
            ¿Cómo funciona? 🤔
          </h2>
          <p className="text-gray-300 text-sm">
            Por cada partido puedes ganar hasta <strong className="text-teal-400">4 puntos</strong>:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold mt-0.5">1.</span>
              <span className="text-gray-400">
                <strong className="text-gray-200">Resultado final</strong> — Si aciertas quién gana o si es empate, sumas{" "}
                <span className="text-teal-400">+1 pt</span>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold mt-0.5">2.</span>
              <span className="text-gray-400">
                <strong className="text-gray-200">Goles de cada equipo</strong> — Por cada equipo cuyo marcador exacto aciertes, sumas{" "}
                <span className="text-teal-400">+1 pt</span> (local + visitante = hasta +2 pts).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold mt-0.5">3.</span>
              <span className="text-gray-400">
                <strong className="text-gray-200">Bonus exactitud</strong> — Si aciertas todo (resultado + goles de ambos), sumas{" "}
                <span className="text-teal-400">+1 pt extra</span>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold mt-0.5">−</span>
              <span className="text-gray-400">
                <strong className="text-gray-200">Penalización</strong> — Si no aciertas nada, pierdes{" "}
                <span className="text-red-400">−1 pt</span>.
              </span>
            </li>
          </ul>
        </div>
        {/* Ejemplo 1 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-white">Ejemplo 1 — Acierto parcial</h2>
          <p className="text-gray-400 text-sm mb-3">
            Tu pronóstico: <strong className="text-gray-200">Bayern 2-1 Real Madrid</strong> — Resultado real: <strong className="text-gray-200">Bayern 1-1 Real Madrid</strong>
          </p>
          <TicketFake data={data[0]} />
          <ul className="space-y-1 mt-3 text-sm text-gray-400">
            <li>✅ Resultado final: ❌ No acertaste (local ≠ empate)</li>
            <li>✅ Goles local: ❌ No acertaste (2 ≠ 1)</li>
            <li>✅ Goles visitante: ✅ Acertaste (1 = 1 → <span className="text-teal-400">+1 pt</span>)</li>
            <li>✅ Bonus: ❌ No aplica</li>
          </ul>
          <p className="text-gray-300 text-sm mt-2">
            Total: <strong className="text-teal-400">1 punto</strong>
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-white">Ejemplo 2 — Acierto total</h2>
          <p className="text-gray-400 text-sm mb-3">
            Tu pronóstico: <strong className="text-gray-200">Bayern 3-1 Real Madrid</strong> — Resultado real: <strong className="text-gray-200">Bayern 3-1 Real Madrid</strong>
          </p>
          <TicketFake data={data[1]} />
          <ul className="space-y-1 mt-3 text-sm text-gray-400">
            <li>✅ Resultado final: ✅ Acertaste (local = local → <span className="text-teal-400">+1 pt</span>)</li>
            <li>✅ Goles local: ✅ Acertaste (3 = 3 → <span className="text-teal-400">+1 pt</span>)</li>
            <li>✅ Goles visitante: ✅ Acertaste (1 = 1 → <span className="text-teal-400">+1 pt</span>)</li>
            <li>✅ Bonus: ✅ Todo correcto → <span className="text-teal-400">+1 pt extra</span></li>
          </ul>
          <p className="text-gray-300 text-sm mt-2">
            Total: <strong className="text-teal-400">4 puntos</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
