'use server'
import Link from "next/link";
import getUserSession from "@/lib/getUserSession";
import { BtnLogOut } from "../buttons/BtnLogOut";

const Header = async (): Promise<JSX.Element> => {
  const {
    data: { user },
  } = await getUserSession();

  return (
    <header className=" h-16 bg-slate-700 px-5">
      <nav className="h-full flex justify-between container items-center">
        <div>
          <Link href="/" className="text-2xl font-semibold">
            Quiniela
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="text-white">
            Profile
          </Link>
          <Link href="/predictions" className="text-white">
            My Predictions
          </Link>
          {!user?.user_metadata && (
            <Link href="/login" className="text-white">
              Login
            </Link>
          )}
          {user?.user_metadata && <BtnLogOut />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
