import { BtnLogOut } from "@/components";
import getUserSession from "@/lib/getUserSession";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const {
    data: { user },
  } = await getUserSession();
  // console.log(user, "👀");

  if (!user) {
    return redirect("/login");
  }
  return (
    <section className="max-w-xl bg-slate-800 mx-auto my-4 rounded-md">
      <div className="max-w-4xl mx-auto rounded-md flex justify-center items-center p-4">
        <div>
          <div className="text-white flex flex-col items-start">
            <Image
              src={user!.user_metadata.picture}
              alt="image-profile"
              width={100}
              height={100}
              className="rounded-full"
            />
            <p className="mb-3 text-white">Name: {user!.user_metadata.name}</p>
            <p className="mb-3 text-white">
              Email: {user!.user_metadata.email}
            </p>
            <BtnLogOut />
          </div>
         
        </div>
      </div>
    </section>
  );
}
