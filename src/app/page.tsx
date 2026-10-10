import HeroSection from "@/components/homepage/HeroSection";
import PriceIncreased from "@/components/homepage/PriceIncreased";
import PriceDecreased from "@/components/homepage/PriceDecreased";
import AllProducts from "@/components/products/AllProducts";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PriceIncreased />
      <PriceDecreased />
      <AllProducts />
    </>
  );
}
