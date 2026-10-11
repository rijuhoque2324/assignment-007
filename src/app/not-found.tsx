
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">

      {/* 404 Number */}
      <h1 className="text-8xl font-extrabold text-[#07893e] sm:text-9xl">
        404
      </h1>

      {/* Heading */}
      <h2 className="mt-5 text-2xl font-bold text-gray-800 sm:text-3xl">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-md text-base leading-7 text-gray-500">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
        পেজটি সরানো হয়েছে অথবা লিংকটি ভুল হতে পারে।
      </p>

      {/* Home Button */}
      <Link
        href="/"
        className="mt-8 rounded-lg bg-[#07893e] px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#067a37] hover:shadow-lg"
      >
        হোম পেজে ফিরে যান
      </Link>

      {/* Bottom Text */}
      <p className="mt-8 text-sm text-gray-400">
        Error Code: 404 | Page Not Found
      </p>

    </div>
  );
};

export default NotFound;
