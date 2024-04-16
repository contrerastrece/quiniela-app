import Link from "next/link";
import createSupabaseServerClient from "@/lib/supabase/server";
import getUserSession from "@/lib/getUserSession";
import { User } from '@supabase/supabase-js';

const Header = async (): Promise<JSX.Element> => {
  const {
    data: { user }
  } = await getUserSession();

  const logoutAction = async () => {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  };

  return (
    <header className=" h-16 bg-slate-700 px-5">
      <nav className="h-full flex justify-between container items-center">
        <div>
          <Link href="/" className="text-2xl font-semibold">
            Quiniela
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="">
            Home
          </Link>
          <Link href="/profile" className="">
            Profile
          </Link>
          {!user?.user_metadata && (
            <Link href="/login" className="">
              Login
            </Link>
          )}
          {user?.user_metadata && (
            <form action={logoutAction} className="flex">
              <button className="ml-4">Logout</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
