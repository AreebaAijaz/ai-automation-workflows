import Image from "next/image";
import Button from "./button";

export default function HeroBanner() {
  return (
    <div className="lg:container lg:flex justify-between h-full lg:h-[584px] w-full lg:w-[1280px] lg:my-4">
      {/* text */}
      <div className="bg-dark-primary text-white space-y-6 lg:space-y-12 container py-16">
        <div className="font-display text-custom-h2 w-full lg:w-[450px]">
          The furniture brand for the future, with timeless designs
        </div>
        <div className="hidden lg:flex">
          <Button text="View Collection" color="bg-white/15" />
        </div>
        <div className="pt-10 lg:pt-36 text-body-lg">
          A new era in eco-friendly furniture with Avelon, the French luxury
          retail brand with nice fonts, tasteful colors, and a beautiful way to
          display things digitally using modern web technologies.
        </div>
        <div className="flex lg:hidden text-body-md">
          <Button text="View Collection" color="bg-white/15" />
        </div>
      </div>
      {/* image */}
      <Image
        className="hidden lg:flex"
        src="/Right Image.png"
        alt=""
        height={584}
        width={520}
      />
    </div>
  );
}
