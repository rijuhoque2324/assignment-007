
"use client";

import { useState } from "react";
import { Product } from "@/types/Product";
import ProductCard from "../products/ProductCard";

const CategoryProducts = ({
  products,
}: {
  products: Product[];
}) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low") {
      return a.today - b.today;
    }

    if (sortBy === "high") {
      return b.today - a.today;
    }

    if (sortBy === "name") {
      return a.nameBn.localeCompare(b.nameBn, "bn");
    }

    return 0;
  });

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-4 flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white p-4">
        <label className="text-sm text-gray-500">
          সাজান
        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
          <option value="name">নাম অনুযায়ী</option>
        </select>
      </div>

      {/* Product Count */}
      <p className="mb-4 text-sm text-gray-500">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখাচ্ছে
      </p>

      {/* Products */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
};

export default CategoryProducts;
