
import Image from "next/image";
import Button from "./button";

export default function Home2Banner() {
  return (
    <div className="md:relative">
     <div className="md:absolute h-[256px] md:h-[250px] lg:h-[444px] md:w-[480px] lg:w-[630px] flex flex-col items-center md:items-start p-2 md:pl-10 md:pt-7 md:top-16 lg:top-24 md:right-12 bg-white space-y-2 lg:space-y-5">
        <p className="font-display text-[20px] md:text-custom-h4 lg:text-custom-h2  w-[280px] md:w-[360px] lg:w-[480px]">Luxury homeware for people who love timeless design quality</p>
        <p className="text-body-sm lg:text-body-lg hidden md:flex">Shop the new spring 2022 collection today.</p>
        <p className="text-body-md md:hidden w-[280px]">With our bew collection, with over 400 besopken from homeware through to furniture today.</p>
        <div className="my-8 md:pt-10 lg:pt-40"><Button text="View Collection" color="bg-light-grey"/></div>
      </div>

      <Image 
        src="/Hero Blocks.png" 
        alt="" 
        // layout="fill" 
        objectFit="cover" 
        height={704} 
        width={1440}
      />
    </div>
  );
}
