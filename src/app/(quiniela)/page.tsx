// "use client";
import { getMatchesfootball, getMatchesfootballFinished } from "@/api";
import { Status } from "@/components";
// import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
// import { useEffect } from "react";
// import { getMatchesfootball, getMatchesfootballFinished } from "@/api"

export default async function HomePage() {
  const getDatas = await getMatchesfootball();
  const getDatasFinished = await getMatchesfootballFinished();

  // const { getQuiniela } = useQuinielaStore();
  // const { data } = useQuinielaStore();
  // const { insertQuiniela } = useQuinielaStore();
  
  // useEffect(() => {
  //   getQuiniela();
  // }, []);
  // console.log(data, "🚩");

  // const handleInsertQuiniela = async () => {
  //   const newQuiniela = {
  //     score_home: 0,
  //     score_visit: 0,
  //     id_match: "100",
  //     user_name: "vcontreras",
  //   };
  //   await insertQuiniela(newQuiniela);
  // };

  const matchesDatas = getDatas?.matches;
  const matchesDatasFinished = getDatasFinished?.matches;

  const nd = new Date();
  const dateConvert = nd.toDateString();

  return (
    <div className="text-white">
      {/* {JSON.stringify(data, null, 2)} */}

      <div className="">
        <h2 className="font-semibold">¡Bienvenido userName!</h2>
        <br></br>
        {/* <button
          onClick={handleInsertQuiniela}
          className="border bg-slate-500 rounded-md px-2"
        >
          Insertar Quiniela
        </button> */}
        <p className="">
          ¡Es hora de poner a prueba tus habilidades de pronóstico futbolístico!
          En Quiniela App, tendrás la oportunidad de demostrar tu conocimiento
          del hermoso juego y competir contra otros aficionados en emocionantes
          quinielas.
        </p>
      </div>
      <section className="px-2 md:px-4 md:w-[600px]">
        <div className="flex justify-between items-center mb-4 md:mb-2">
          <h1 className="text-md md:text-xl font-bold">MATCHES</h1>
          <div className="px-4 py-0 md:py-1 bg-slate-600 rounded-md text-textPrimary text-sm">
            <p>{`${dateConvert}`}</p>
          </div>
        </div>
        <Status
          // matchesList={0}
          matchesListFinished={matchesDatasFinished}
        />
      </section>
    </div>
  );
}
