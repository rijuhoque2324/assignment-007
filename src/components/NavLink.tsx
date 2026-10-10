import NavLinkItems from "./NavLinkItems";

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
         <NavLinkItems
            key={category.id}
            id={category.id}
            nameBn={category.nameBn}
            icon={category.icon}
          />
        ))}
      </div>
    </nav>
  );
};

export default NavLink;