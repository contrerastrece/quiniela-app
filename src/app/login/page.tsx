import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      {/* Login card */}
      <div className="w-full max-w-sm">
        <div className="bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-700 shadow-xl">
          <div className="text-center mb-6">
            <h1
              className={`${titleFont.className} text-3xl font-bold text-teal-400 mb-2`}
            >
              Quiniela-Contra
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pronostica resultados de fútbol europeo, compite en grupos y
              demuestra quién sabe más.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="w-6 h-6 rounded-full bg-teal-900/50 text-teal-300 flex items-center justify-center text-xs font-bold">1</span>
              <span>Crea o únete a un grupo</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="w-6 h-6 rounded-full bg-teal-900/50 text-teal-300 flex items-center justify-center text-xs font-bold">2</span>
              <span>Pronostica los marcadores</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="w-6 h-6 rounded-full bg-teal-900/50 text-teal-300 flex items-center justify-center text-xs font-bold">3</span>
              <span>Compite en el ranking del grupo</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
