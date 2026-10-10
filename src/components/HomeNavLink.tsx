
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeNavLink = () => {
  const pathname = usePathname();
  const isActive = pathname === "/";

  return (
    <Link
      href="/"
      className={`shrink-0 border-t-2 px-3 py-2 ${
        isActive
            ? "border-green-600 bg-green-600 text-white"
            : "border-transparent text-gray-700 hover:border-green-600 hover:text-green-600"
       }`}
    >
     <span>🏠︎</span> হোম
    </Link>
  );
};

export default HomeNavLink;
