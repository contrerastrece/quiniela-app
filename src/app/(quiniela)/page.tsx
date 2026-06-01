import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const {
    data: { user },
  } = await getUserSession();

  if (!user) {
    return redirect("/login");
  }

  return redirect("/groups");
}
