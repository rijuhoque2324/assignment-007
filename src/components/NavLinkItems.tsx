"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  id: string | number;
  nameBn: string;
  icon: string;
}

const NavLinkItems = ( { id, nameBn, icon }: NavLinkProps ) => {
  const pathname = usePathname();
  const href = `/category/${id}`;

  const isActive = pathname === href;
    return (
        <Link
      href={href}
      className={`
        flex shrink-0 items-center gap-1.5
        border-t-2 px-3 py-2
        text-sm font-medium transition-colors duration-200 sm:px-4
        ${
          isActive
            ? "border-green-600 text-green-600"
            : "border-transparent text-gray-700 hover:border-green-600 hover:text-green-600"
        }
      `}
    >
      <span>{icon}</span>
      <span>{nameBn}</span>
    </Link>
    );
};

export default NavLinkItems;