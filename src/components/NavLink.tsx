
import { Suspense } from "react";
import NavLinkItems from "./NavLinkItems";
import HomeNavLink from "./HomeNavLink";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Categories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await res.json();

  return (
    <div className="container mx-auto flex gap-2 px-4">
      <HomeNavLink />

      {data.map((category) => (
        <NavLinkItems
          key={category.id}
          slug={category.slug}
          nameBn={category.nameBn}
          icon={category.icon}
        />
      ))}
    </div>
  );
};

const NavLink = () => {
  return (
    <nav className="border-y border-gray-200">
      <Suspense fallback={<p>Loading...</p>}>
        <Categories />
      </Suspense>
    </nav>
  );
};

export default NavLink;
