import Link from "next/link";
import getUserSession from "@/lib/getUserSession";
import { BtnLogOut } from "../buttons/BtnLogOut";
import { usePathname, useRouter } from "next/navigation";
import { NavLinks } from "../links/NavLinks";

const Header = async (): Promise<JSX.Element> => {
  const {
    data: { user },
  } = await getUserSession();

  return (
    <header className=" h-12 bg-slate-700 px-5 sticky top-0 z-10 ">
      <nav className="h-full flex justify-between container items-center  max-w-3xl mx-auto">
        <div>
          <Link href="/competitions" className="text-xl font-semibold text-teal-400">
            Quiniela
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <NavLinks />

          {/* {user?.user_metadata && <BtnLogOut />} */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
