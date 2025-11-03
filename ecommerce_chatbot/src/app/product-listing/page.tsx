import ProductListingPage from "@/components/product-listing";
// import Navbar1 from "@/components/navbar";
import GetInTouch2 from "@/components/get-in-touch2";
import HomeNav from "@/components/navbar";
import ProductListingBanner from "@/components/product-listing-banner";


export default function ProductListing(){
    return(
        <div>
             <HomeNav />
            <ProductListingPage />
            <ProductListingBanner />
        </div>
    )
}