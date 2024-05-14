import { TicketFake } from "@/components";
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
          <p className="text-gray-200 ">
            Acierto del resultado final:{" "}
            <span className="text-gray-400 text-sm ">
              Si adivinas quién ganará el partido o si será empate, ganas{" "}
              <span className="text-teal-400">1 punto</span>.
            </span>
          </p>
          <p className="text-gray-200">
            Acierto en los goles de cada equipo:{" "}
            <span className="text-gray-400 text-sm ">
              Si adivinas cuántos goles marcará el equipo local y/o el equipo
              visitante, ganas <span className="text-teal-400">1 punto</span>{" "}
              por cada equipo.
            </span>
          </p>
          <p className="text-gray-200 text-base">
            Bonus especial:{" "}
            <span className="text-sm text-gray-400">
              Si adivinas el resultado exacto del partido (quién gana y cuántos
              goles marcan ambos equipos), ¡ganarás{" "}
              <span className="text-teal-400">1 punto extra</span>!
            </span>
          </p>
          <p className="text-gray-200">
            Penalización:{" "}
            <span className="text-sm text-gray-400">
              Si no adivinas nada, se te resta{" "}
              <span className="text-red-400">1 punto</span>, pero no te
              preocupes, ¡es parte del juego!
            </span>
          </p>
        </div>
        {/* Ejemplo 1 */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2 text-white">Ejemplo 1:</h2>
          <p className="text-gray-400 text-base">
            Imagina que dices que el equipo local ganará 2-1, pero el partido
            termina empatado 1-1.
          </p>
          <br />
          <TicketFake data={data[0]} />
          <br />
          <ul className="list-disc ml-5">
            <li className="text-gray-400 text-base">
              Resultado final: Como no acertaste quién ganaría o si sería
              empate, no ganas puntos aquí.
            </li>
            <li className="text-gray-400 text-base">
              Goles de cada equipo: Aunque no adivinaste exactamente cuántos
              goles marcaría el equipo local, sí adivinaste cuántos goles
              marcaría el equipo visitante. Así que ganas{" "}
              <span className="text-gray-300">1 punto</span> por eso.
            </li>
            <li className="text-gray-400 text-base">
              Bonus: No obtienes ningún punto extra porque no adivinaste el
              resultado exacto del partido.
            </li>
          </ul>
          <br />
          <p className="text-gray-400 text-base">
            En resumen, en este caso, ganarías{" "}
            <span className="text-teal-400">1 punto</span> por haber acertado
            los goles del equipo visitante. Y como no acertaste el resultado
            final ni los goles del equipo local, tu puntaje final sería de{" "}
            <strong className="text-teal-400">1 punto</strong>.
          </p>
        </div>
        {/* Ejemplo 2 */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2 text-white">Ejemplo 2:</h2>
          <p className="text-gray-400 text-base">
            Imagina que predices que el equipo local ganará 3-1, y el partido
            termina con el equipo local ganando 3-1.
          </p>
          <br />
          <TicketFake data={data[1]} />
          <br />
          <ul className="list-disc ml-5">
            <li className="text-gray-400 text-base">
              Resultado final: Acertaste que el equipo local ganaría, así que
              ganas <span className="text-gray-300">1 punto.</span>
            </li>
            <li className="text-gray-400 text-base">
              Goles de cada equipo: Predijiste correctamente que el equipo local
              marcaría 3 goles y que el equipo visitante marcaría 1 gol. Por lo
              tanto, ganas 1 punto por cada equipo, sumando{" "}
              <span className="text-gray-300">2 puntos </span>
              en total.
            </li>
            <li className="text-gray-400 text-base">
              Bonus: Como acertaste el resultado exacto del partido (quién gana
              y cuántos goles marcan ambos equipos), ganas{" "}
              <span className="text-gray-300">1 punto</span> extra.
            </li>
          </ul>
          <br />
          <p className="text-gray-400 text-base">
            En resumen, en este caso, ganarías{" "}
            <span className="text-teal-400">1 punto</span> por acertar el
            resultado final,
            <span className="text-teal-400"> 2 puntos</span> por acertar los
            goles de cada equipo, y{" "}
            <span className="text-teal-400">1 punto</span> extra por acertar el
            resultado exacto del partido. Por lo tanto, tu puntaje final sería
            de <strong className="text-teal-400">4 puntos.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
