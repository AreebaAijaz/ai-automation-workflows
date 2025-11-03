import AboutText from "@/components/page-text";
import AboutBanner from "@/components/page-banner";
import BrandQuality from "@/components/brand-quality";
import Footer from "@/components/footer";
import GetInTouch from "@/components/get-in-touch";
import GetInTouch2 from "@/components/get-in-touch2";
import Navbar3 from "@/components/navbar-3";
import PageText from "@/components/page-text";

export default function ProductV3() {
  return (
    <div>
      <Navbar3 />
      <PageText />
      <GetInTouch />
      <GetInTouch2 />
      <BrandQuality />
      <AboutBanner />
    </div>
  );
}
