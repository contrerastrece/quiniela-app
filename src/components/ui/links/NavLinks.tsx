"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavLinks = () => {
  const path = usePathname();
  const links = [
    {
      name: "Profile",
      pathName: "/profile",
    },
    {
      name: "My Picks",
      pathName: "/predictions",
    },
    {
      name: "Top",
      pathName: "/rank",
    },
  ];
  return (
    <div className="flex gap-2">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.pathName}
          className={` text-sm ${path===link.pathName?'font-semibold text-teal-400':'text-white'} hover:font-bold transition-all`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};
