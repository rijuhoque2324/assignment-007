import { Product } from "@/types/Product";
import ProductCard from "../products/ProductCard";


const PriceIncreased = async () => {
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

  const increased = products
  .filter((item) => item.change?.dir === "up")
  .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
  .slice(0, 6);

  return (
    <section className="container mx-auto py-6">
      <h2 className="mb-4 text-xl font-bold">
        <span className="text-red-600">▲</span> আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {increased.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceIncreased;
