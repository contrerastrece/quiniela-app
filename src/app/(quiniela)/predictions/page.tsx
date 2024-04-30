import { AllPredictions } from "@/components";

import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";

const PredictionsPage = async () => {
  const {
    data: { user },
  } = await getUserSession();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold my-3">Mis Predicciones</h2>

      <AllPredictions />
    </div>
  );
};

export default PredictionsPage;
