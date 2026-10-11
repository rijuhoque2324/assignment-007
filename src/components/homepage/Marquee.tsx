import { Suspense } from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";

interface Headline {
  id: string | number;
  nameBn: string;
  categoryIcon?: string;
  today: number;
  unit: string;
  change?: {
    dir?: "up" | "down" | "same";
    pct?: number;
  };
}

const MarqueeContent = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const headlines: Headline[] = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
    ? data.data
    : Array.isArray(data.products)
    ? data.products
    : [];

  return (
    <MarqueeText
      className="py-1"
      direction="right"
      duration={20}
    >
      {headlines.map((item) => (
        <Link
          key={item.id}
          href={`/products/${item.id}`}
          className="mx-3 inline-flex items-center gap-2 border-r border-gray-300 pr-4 text-sm"
        >
          <span>{item.categoryIcon ?? "🛒"}</span>

          <span>
            {item.nameBn} {item.today} টাকা/{item.unit}
          </span>

          <span
            className={
              item.change?.dir === "up"
                ? "text-red-600"
                : item.change?.dir === "down"
                ? "text-green-600"
                : "text-gray-500"
            }
          >
            {item.change?.dir === "up"
              ? "▲"
              : item.change?.dir === "down"
              ? "▼"
              : "—"}

            {item.change?.pct ?? 0}%
          </span>
        </Link>
      ))}
    </MarqueeText>
  );
};

const Marquee = () => {
  return (
    <div className="overflow-hidden">
      <Suspense fallback={<p>Loading products...</p>}>
        <MarqueeContent />
      </Suspense>
    </div>
  );
};

export default Marquee;