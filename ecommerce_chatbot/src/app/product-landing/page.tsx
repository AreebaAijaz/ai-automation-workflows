import Navbar2 from "@/components/navbar-2";
import ProductDetails from "@/components/product-details";
import PopularProducts from "../../components/popular-products";
import BrandQuality from "@/components/brand-quality";
import Club from "@/components/club";
import ProductEmail from "@/components/product-email";

export default function ProductLandingPage() {
  return (
    <div>
      <Navbar2 />
      <ProductDetails />
      <BrandQuality />
      <ProductEmail />
    </div>
  );
}
