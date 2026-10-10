
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinkItems = ({
  slug,
  nameBn,
  icon,
}: NavLinkProps) => {
  const pathname = usePathname();

  const href = `/category/${slug}`;

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 border-t-2 px-3 py-2 ${
        isActive
          ? "border-green-600 bg-green-600 text-white"
          : "border-transparent text-gray-700 hover:border-green-600 hover:text-green-600"
      }`}
    >
      <span>{icon}</span>
      <span>{nameBn}</span>
    </Link>
  );
};

export default NavLinkItems;
