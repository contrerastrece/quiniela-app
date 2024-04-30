import { Status } from "@/components";
import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const {
    data: { user },
  } = await getUserSession();
  // console.log(user, "👀");

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="text-white">
      <section className="px-2 md:px-4 md:w-[600px]">
        <div className="flex justify-between items-center mb-4 md:mb-2">
          <h1 className="text-md md:text-xl font-bold">MATCHES</h1>
          <div className="px-4 py-0 md:py-1 bg-slate-600 rounded-md text-textPrimary text-sm">
            {/* <p>{`${dateConvert}`}</p> */}
          </div>
        </div>
        <Status />
      </section>
    </div>
  );
}
