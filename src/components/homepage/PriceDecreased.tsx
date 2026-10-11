
import ProductCard from "../products/ProductCard";
import { Product } from "@/types/Product";

const PriceDecreased = async () => {
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

  const decreased = products
  .filter((item) => item.change?.dir === "down")
  .sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0))
  .slice(0, 6);

  return (
    <section className="container mx-auto py-6 px-4">
      <h2 className="mb-4 text-xl font-bold">
        <span className="text-green-600">▼</span> আজ দাম কমেছে
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decreased.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceDecreased;
