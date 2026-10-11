
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, User, LogOut } from "lucide-react";
import { toast } from "react-toastify";

const UserInfor = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign out
  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
        toast.error(error.message || "সাইন আউট হয়নি!");
        return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    setIsOpen(false);
    router.push("/signin");
    router.refresh();
    };

  // Loading
  if (isPending) {
    return (
      <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <Link
          href="/signin"
          className="rounded-lg px-2 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-100 sm:px-4 sm:text-base"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-[#07893e] px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#067a37] sm:px-5 sm:text-base"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  // Logged in
  return (
    <div ref={dropdownRef} className="relative shrink-0">
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex cursor-pointer items-center gap-2 rounded-lg p-1 transition hover:bg-gray-100 sm:gap-3"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-700">
        <User size={20} />
        </div>       

        <span className="hidden max-w-28 truncate text-sm font-medium text-gray-800 sm:block">
          {user.name}
        </span>

        <ChevronDown
          size={15}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:w-72"
        >
          <h3 className="truncate text-sm font-semibold text-gray-800">
            {user.name}
          </h3>

          <p className="mt-1 truncate text-xs text-gray-500">
            {user.email}
          </p>

          <div className="mt-4 space-y-1">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
            >
              <User size={17} className="text-blue-500" />
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={17} />
              সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfor;
