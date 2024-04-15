import getUserSession from "@/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    return redirect("/login");
  }

  const user = session.user;

  return (
    <section className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto rounded-md h-[20rem] flex justify-center items-center">
        <div>
          <p className="mb-3 text-5xl text-center font-semibold">
            Profile Page
          </p>
          <div className="mt-8">
            {/* {JSON.stringify(user,null,2)} */}
            {/* <p className='mb-3'>Id: {user.id}</p> */}
            {/* <p className='mb-3'>Role: {user.role}</p> */}
            <p className="mb-3 text-white">Email: {user.email}</p>
            {/* <p className='mb-3'>Provider: {user.app_metadata['provider']}</p> */}
            {/* <p className='mb-3'>Created At: {user.created_at}</p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
