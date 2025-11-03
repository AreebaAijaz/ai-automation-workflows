import Button from "./button";
import PageText from "./page-text";
import Image from "next/image";

export default function AboutBanner(){
    return(
        <main>
        <div className="container">
            <div className="lg:flex items-center justify-around space-y-6 my-10">
                <div className="">
                <PageText />
                </div>
                <div className="pt-4 lg:pt-0"><Button text="View our products" color="bg-light-grey"/></div>
            </div>
            <div className="space-y-6 lg:space-y-0 lg:flex gap-x-4 justify-between items-center">
                <div className="h-[281px] lg:h-[478px] md:w-[630px] lg:w-[634px] bg-dark-primary text-white space-y-4 lg:space-y-0 py-8 lg:py-12">
                    <div className="container ">
                    <p className="font-display text-custom-h4 md:text-custom-h2 ">It started with a small idea</p>
                    <p className="text-body-md md:w-[400px] lg:w-auto">A global brand with local beginnings, our story begin in a small studio in South London in early 2014.</p>
                    <div className="pt-10 lg:pt-48"><Button text="View collection" color="bg-white/15" /></div>
                    </div>
                </div>
                <Image src="/Image Block.png" alt="" height={478} width={630} />
            </div>
            </div>

            {/* getintouch2 */}
            <div className="md:flex mt-16">
      <div>
        <Image
          className=""
          src="/Image (2).png"
          alt=""
          height={603}
          width={720}
        />
      </div>

      <div className="container bg-light-grey  lg:h-[564px] lg:w-[720px] md:w-[600px] pt-8 pb-12 md:pt-6 md:pb-0 lg:pt-16 space-y-2 lg:space-y-6">
        <p className="font-display text-custom-h3 md:text-custom-h5 lg:text-custom-h3">
          From a studio in London to a global brand with over 400 outlets
        </p>
        <p className="text-body-sm lg:text-body-md">
          When we started Avion, the idea was simple. Make high quality
          furniture affordable and available for the mass markert.{" "}
        </p>

        <p className="text-body-sm lg:text-body-md lg:w-[490px]">
          Handmade, and lovingly crafted furniture and homeware is what we live
          breathe and design so our Chelsea boutique become the hotbed for the
          London interior design community
        </p>
        <div className="text-body-md pt-4 md:pt-3 lg:pt-36">
          <Button text="Get in touch" color="bg-white" />
        </div>
      </div>
    </div>

        </main>
    )
}