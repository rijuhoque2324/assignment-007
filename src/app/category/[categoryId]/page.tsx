import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/Product";

interface Category {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Props {
  params: Promise<{ categoryId: string }>;
}

// API fetching component
const CategoryContent = async ({ params }: Props) => {
  const { categoryId } = await params;

  const [categoryRes, productRes] = await Promise.all([
    fetch("https://openapi.programming-hero.com/api/bazardor/categories"),
    fetch("https://openapi.programming-hero.com/api/bazardor/products"),
  ]);

  if (!categoryRes.ok || !productRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const categoryData = await categoryRes.json();
  const productData = await productRes.json();

  const categories: Category[] = Array.isArray(categoryData)
    ? categoryData
    : categoryData.data ?? [];

  const products: Product[] = Array.isArray(productData)
    ? productData
    : productData.data ?? [];

  const category = categories.find(
    (item) => item.slug === categoryId
  );

  if (!category) {
    notFound();
  }

  const filteredProducts = products.filter(
    (item) => item.category === categoryId
  );

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">
        {category.icon} {category.nameBn}
      </h1>

      <p className="mb-4">
        মোট {filteredProducts.length.toLocaleString("bn-BD")} টি পণ্য
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

// Page with Suspense
const Page = ({ params }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-10 text-center">
          ক্যাটাগরির পণ্য লোড হচ্ছে...
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
};

export default Page;