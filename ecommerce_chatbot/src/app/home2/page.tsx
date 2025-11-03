import BrandQuality from "@/components/brand-quality";
import Ceramics from "@/components/ceramics";
import Home2Banner from "@/components/home2-banner";
import Home2Banner2 from "@/components/home2-banner2";
import HomeNav from "@/components/navbar";
import PageBanner from "@/components/page-banner";

export default function HomeV2(){
    return(
        <div>
            <HomeNav />
            <Home2Banner />
            <BrandQuality />
            <Ceramics HeaderProps=""/>
            <Home2Banner2 />
            <PageBanner />
        </div>
    )
}