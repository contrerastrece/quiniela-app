"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HiOutlineUserCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineTrophy,
  HiOutlineQuestionMarkCircle,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";

export const NavLinks = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Perfil", pathName: "/profile", icon: HiOutlineUserCircle },
    { name: "Mis Picks", pathName: "/predictions", icon: HiOutlineClipboardDocumentList },
    { name: "Ranking", pathName: "/rank", icon: HiOutlineTrophy },
    { name: "Cómo funciona", pathName: "/about", icon: HiOutlineQuestionMarkCircle },
  ];

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
        <div className="absolute top-12 left-0 right-0 bg-slate-700 border-t border-slate-600 md:hidden">
          <div className="flex flex-col p-4 gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.pathName}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 text-sm ${
                    path === link.pathName
                      ? "font-semibold text-teal-400"
                      : "text-white"
                  } hover:font-bold transition-all`}
                >
                  <Icon className="text-lg" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop links */}
      <div className="hidden md:flex gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.pathName}
              className={`flex items-center gap-1 text-sm ${
                path === link.pathName
                  ? "font-semibold text-teal-400"
                  : "text-white"
              } hover:font-bold transition-all`}
            >
              <Icon className="text-base" />
              {link.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};
