import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import { TeamLottie } from "@/components";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-3 items-center gap-4 px-3">
      <h1
        className={`${titleFont.className} text-4xl mb-5 font-bold text-white`}
      >
        Ingresar
      </h1>
      <p className=" text-white font-thin mb-5 max-w-lg">
        ¡Es hora de poner a prueba tus habilidades de pronóstico futbolístico!
        En Quiniela-Contra, tendrás la oportunidad de demostrar tu conocimiento del
        hermoso juego y competir contra otros aficionados en emocionantes
        quinielas.
      </p>
      <LoginForm />
      <TeamLottie />
    </div>
  );
}
