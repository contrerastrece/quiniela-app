"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  HiOutlineUserCircle,
  HiOutlineQuestionMarkCircle,
  HiOutlineUserGroup,
  HiOutlineInboxArrowDown,
  HiOutlineArrowRightOnRectangle,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";

export const NavLinks = () => {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const links = [
    { name: "Grupos", pathName: "/groups", icon: HiOutlineUserGroup },
    { name: "Solicitudes", pathName: "/groups/requests", icon: HiOutlineInboxArrowDown },
    { name: "Perfil", pathName: "/profile", icon: HiOutlineUserCircle },
    { name: "Cómo funciona", pathName: "/about", icon: HiOutlineQuestionMarkCircle },
  ];

  const linkClass = (pathName: string, base: string) =>
    `${base} flex items-center gap-1 text-sm ${
      path === pathName ? "font-semibold text-teal-400" : "text-white"
    } hover:font-bold transition-all`;

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        {open ? <HiXMark size={24} /> : <HiBars3 size={24} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-12 left-0 right-0 bg-slate-700 border-t border-slate-600 md:hidden z-50">
          <div className="flex flex-col p-4 gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.pathName}
                  onClick={() => setOpen(false)}
                  className={linkClass(link.pathName, "")}
                >
                  <Icon className="text-lg" />
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={() => { setOpen(false); handleLogout(); }}
              className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-all pt-2 border-t border-slate-600 mt-2"
            >
              <HiOutlineArrowRightOnRectangle className="text-lg" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.pathName}
              className={linkClass(link.pathName, "")}
            >
              <Icon className="text-base" />
              {link.name}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-400 transition-all ml-2 pl-2 border-l border-slate-600"
          title="Cerrar sesión"
        >
          <HiOutlineArrowRightOnRectangle className="text-base" />
        </button>
      </div>
    </>
  );
};
