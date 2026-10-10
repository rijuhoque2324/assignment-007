import Image from "next/image";
import Link from "next/link";
import CurrentDate from "./CurrentDate";

const Header = () => {


  return (
    <div className="container mx-auto px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between gap-4">

        {/* Logo + Brand */}
        <Link href="/">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#07893e] sm:h-14 sm:w-14">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={40}
                height={40}
                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold leading-tight text-gray-900 sm:text-2xl">
                বাজার দর
              </h1>

              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                <CurrentDate/>
              </p>
            </div>
          </div>
        </Link>

        {/* Auth Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href="/signup">
          <button
            type="button"
            className="rounded-lg px-2 py-2 font-semibold text-gray-800 transition hover:bg-gray-100 sm:px-4 sm:text-base"
          >
            সাইন ইন
          </button>
          </Link>

        <Link href="/signin">
          <button
            type="button"
            className="rounded-lg bg-[#07893e] px-3 py-2 font-semibold text-white shadow-md transition hover:bg-[#067a37] active:scale-95 sm:px-5 sm:py-2 sm:text-base"
          >
            সাইন আপ
          </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Header;