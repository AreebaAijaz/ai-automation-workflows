import AboutBanner from "@/components/abt-banner";
import BrandQuality from "@/components/brand-quality";
import Club from "@/components/club";
import GetInTouch from "@/components/get-in-touch2";
import Navbar3 from "@/components/navbar-3";

export default function About(){
    return(
        <div>
        <Navbar3 />
        <AboutBanner />
        <BrandQuality />
        <Club />
        </div>
    )
}