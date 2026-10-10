import { Product } from "@/types/Product";
import Link from "next/link";


const ProductCard = ({ product }: { product: Product }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link href={`/products/${product.id}`}>
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-gray-100 p-3 text-xl">
          {product.categoryIcon}
        </span>

        <div>
          <h3 className="font-semibold">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        আজকের দাম
      </p>

      <div className="flex items-center justify-between">
        <p className="font-bold">
          {product.today.toLocaleString("bn-BD")} টাকা
        </p>

        <span
          className={
            isUp
              ? "text-red-600"
              : isDown
              ? "text-green-600"
              : "text-gray-500"
          }
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {product.change.pct.toLocaleString("bn-BD")}%
        </span>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
