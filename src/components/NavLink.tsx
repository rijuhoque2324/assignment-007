import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLink = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data = await res.json();

  return (
    <nav className="border-y border-gray-200">
      <div className="container mx-auto flex items-center gap-1 overflow-x-auto px-4 sm:flex-wrap sm:gap-2 sm:overflow-visible">
        {data.map((category: Navs) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="
              flex shrink-0 items-center gap-1.5
              border-t-2 border-transparent
              px-3 py-2
              text-sm font-medium text-gray-700
              transition-all duration-200
              hover:border-green-600
              hover:text-green-600
              sm:px-4
            "
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLink;