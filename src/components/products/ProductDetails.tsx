
import Link from "next/link";
import { Product } from "@/types/Product";
import PriceTable from "./PriceTable";


const ProductDetails = ({
  product,
}: {
  product: Product;
}) => {
  const bn = (num: number) =>
    num.toLocaleString("bn-BD");

  const prices = product.markets ?? [];

  const lowest = prices.length
    ? Math.min(...prices.map((item) => item.min))
    : 0;

  const highest = prices.length
    ? Math.max(...prices.map((item) => item.max))
    : 0;

  const average = prices.length
    ? prices.reduce(
        (sum, item) => sum + (item.min + item.max) / 2,
        0
      ) / prices.length
    : 0;

  return (
    <section className="container mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <div className="mb-6 flex gap-2 text-sm text-gray-500">
        <Link href="/">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`}>
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span>{product.nameBn}</span>
      </div>

      {/* Product Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row">

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-gray-100 p-4 text-3xl">
            {product.categoryIcon}
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {product.nameBn}
            </h1>

            <p className="text-sm text-gray-500">
              প্রতি {product.unit} · {product.categoryNameBn}
            </p>

            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম{" "}
              {product.change.dir === "up"
                ? "বেড়েছে"
                : product.change.dir === "down"
                ? "কমেছে"
                : "অপরিবর্তিত"}।
            </p>
          </div>
        </div>

        {/* Today Price */}
        <div className="rounded-xl bg-[#f1f5f1] px-6 py-4 text-center">
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <h2 className="text-3xl font-bold">
            {bn(product.today)}
          </h2>

          <p className="text-xs text-gray-500">
            টাকা / {product.unit}
          </p>

          <p
            className={`mt-2 text-sm font-semibold ${
              product.change.dir === "up"
                ? "text-red-600"
                : product.change.dir === "down"
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
              ? "▼"
              : "—"}{" "}
            {bn(product.change.pct)}%
          </p>
        </div>
      </div>

      {/* Price Summary + Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <h2 className="mb-4 text-lg font-bold">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-xl border p-4">
            <p className="text-xs text-gray-500">
              সর্বনিম্ন দাম
            </p>
            <p className="text-xl font-bold text-green-600">
              {bn(lowest)} টাকা
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs text-gray-500">
              সর্বোচ্চ দাম
            </p>
            <p className="text-xl font-bold text-red-600">
              {bn(highest)} টাকা
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs text-gray-500">
              গড় দাম
            </p>
            <p className="text-xl font-bold text-green-600">
              {bn(Math.round(average))} টাকা
            </p>
          </div>

        </div>

        <h2 className="mb-4 mt-8 text-lg font-bold">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <PriceTable markets={prices} />

      </div>
    </section>
  );
};

export default ProductDetails;
