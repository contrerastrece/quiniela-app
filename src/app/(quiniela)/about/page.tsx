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
    <div className="flex items-center justify-center px-2 py-4">
      <div className="max-w-2xl w-full bg-slate-800 rounded-2xl border border-slate-700 px-4 md:px-8 pt-6 pb-8 my-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Cómo funciona</h2>
          <p className="text-slate-400 text-sm">
            Pronostica partidos dentro de un grupo y compite por el primer lugar del ranking.
          </p>
        </div>

        {/* Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-teal-900/50 text-teal-300 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">1</div>
            <h3 className="text-sm font-semibold text-white mb-1">Únete a un grupo</h3>
            <p className="text-xs text-slate-400">Crea tu grupo o usa un código de invitación para unirte.</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-teal-900/50 text-teal-300 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">2</div>
            <h3 className="text-sm font-semibold text-white mb-1">Pronostica</h3>
            <p className="text-xs text-slate-400">Ingresa el marcador que crees que tendrá cada partido.</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-teal-900/50 text-teal-300 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">3</div>
            <h3 className="text-sm font-semibold text-white mb-1">Compite</h3>
            <p className="text-xs text-slate-400">Gana puntos y sube en el ranking de tu grupo.</p>
          </div>
        </div>

        {/* Scoring rules */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-3">Puntuación</h3>
          <p className="text-slate-400 text-sm mb-3">
            Por cada partido puedes ganar hasta <strong className="text-teal-400">4 puntos</strong>:
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-700/30 rounded-lg px-3 py-2 text-sm">
              <span className="text-slate-300">Acertar resultado (L/V/E)</span>
              <span className="text-teal-400 font-semibold">+1 pt</span>
            </div>
            <div className="flex items-center justify-between bg-slate-700/30 rounded-lg px-3 py-2 text-sm">
              <span className="text-slate-300">Acertar goles del local</span>
              <span className="text-teal-400 font-semibold">+1 pt</span>
            </div>
            <div className="flex items-center justify-between bg-slate-700/30 rounded-lg px-3 py-2 text-sm">
              <span className="text-slate-300">Acertar goles del visitante</span>
              <span className="text-teal-400 font-semibold">+1 pt</span>
            </div>
            <div className="flex items-center justify-between bg-slate-700/30 rounded-lg px-3 py-2 text-sm">
              <span className="text-slate-300">Bonus por resultado exacto</span>
              <span className="text-teal-400 font-semibold">+1 pt</span>
            </div>
            <div className="flex items-center justify-between bg-slate-700/30 rounded-lg px-3 py-2 text-sm">
              <span className="text-slate-300">No acertar nada</span>
              <span className="text-red-400 font-semibold">-1 pt</span>
            </div>
          </div>
        </div>

        {/* Ejemplos */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Ejemplo 1 — Acierto parcial</h3>
            <p className="text-slate-400 text-sm mb-3">
              Pronosticaste <strong className="text-gray-200">Bayern 2-1 Real Madrid</strong> — Resultado real: <strong className="text-gray-200">Bayern 1-1 Real Madrid</strong>
            </p>
            <TicketFake data={data[0]} />
            <ul className="space-y-1 mt-3 text-sm text-slate-400 bg-slate-700/20 rounded-lg p-3">
              <li>❌ Resultado: no acertaste (local ≠ empate)</li>
              <li>❌ Goles local: no acertaste (2 ≠ 1)</li>
              <li>✅ Goles visitante: acertaste (1 = 1 → +1 pt)</li>
              <li>❌ Bonus: no aplica</li>
            </ul>
            <p className="text-sm mt-2">
              Total: <strong className="text-teal-400">1 punto</strong>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">Ejemplo 2 — Acierto total</h3>
            <p className="text-slate-400 text-sm mb-3">
              Pronosticaste <strong className="text-gray-200">Bayern 3-1 Real Madrid</strong> — Resultado real: <strong className="text-gray-200">Bayern 3-1 Real Madrid</strong>
            </p>
            <TicketFake data={data[1]} />
            <ul className="space-y-1 mt-3 text-sm text-slate-400 bg-slate-700/20 rounded-lg p-3">
              <li>✅ Resultado: acertaste (+1 pt)</li>
              <li>✅ Goles local: acertaste (+1 pt)</li>
              <li>✅ Goles visitante: acertaste (+1 pt)</li>
              <li>✅ Bonus: todo correcto (+1 pt extra)</li>
            </ul>
            <p className="text-sm mt-2">
              Total: <strong className="text-teal-400">4 puntos</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
