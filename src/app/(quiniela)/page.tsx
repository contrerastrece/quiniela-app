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
        <Status user={user} />
      </section>
    </div>
  );
}
