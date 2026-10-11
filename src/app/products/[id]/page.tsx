
import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import { Product } from "@/types/Product";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  const data = await res.json();

  const product: Product = data.data ?? data;

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
};

export default Page;
