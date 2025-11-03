import BrandQuality from "@/components/brand-quality";
import Ceramics from "@/components/ceramics";
import Club from "@/components/club";
import GetInTouch from "@/components/get-in-touch";
import HeroBanner from "@/components/herobanner";
import HomeNav from "@/components/navbar";
import PopularProducts from "@/components/popular-products";

export default function Home() {
  return (
    <div>
      <HomeNav />
      <HeroBanner />
      <BrandQuality />
      <Ceramics HeaderProps="New Ceramics"/>
      <PopularProducts />
      <Club />
      <GetInTouch />
    </div>
  );
}




