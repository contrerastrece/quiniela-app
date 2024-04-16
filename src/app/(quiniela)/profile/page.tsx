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
    <section className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto rounded-md h-[20rem] flex justify-center items-center">
        <div>
          <p className="mb-3 text-5xl text-center font-semibold">
            Profile Page
          </p>
          <div className="mt-8 text-white">
            {/* {JSON.stringify(user, null, 2)} */}
            {/* <p className='mb-3'>Id: {user.id}</p> */}
            {/* <p className='mb-3'>Role: {user.role}</p> */}
            <p className="mb-3 text-white">Email: {user.user_metadata.email}</p>
            <Image
              src={user.user_metadata.picture}
              alt="image-profile"
              width={100}
              height={100}
              className="rounded-full"
            />
            {/* <p className='mb-3'>Provider: {user.app_metadata['provider']}</p> */}
            {/* <p className='mb-3'>Created At: {user.created_at}</p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
