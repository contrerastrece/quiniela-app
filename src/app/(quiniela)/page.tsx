import { getMatchesfootballByWeek } from "@/api";
import { Status } from "@/components";

export default async function HomePage() {
  // const { matches } = await getMatchesfootballByWeek();
  // console.log(matches.length)

  return (
    <div className="text-white">
      <div className="p-2">
        <h2 className="font-semibold">¡Bienvenido userName!</h2>
        <br></br>
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
            {/* <p>{`${dateConvert}`}</p> */}
          </div>
        </div>
        <Status  />
      </section>
    </div>
  );
}
