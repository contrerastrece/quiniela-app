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
    <div className="text-white  p-2">
      {/* <h2 className="text-xl font-semibold my-3">My Predictions</h2> */}

      <AllPredictions />
    </div>
  );
};

export default PredictionsPage;
