
import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : data.data ?? [];

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-xl font-bold">
        সব পণ্য
      </h2>
      <p className="mb-4 text-sm text-gray-500">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখাচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
