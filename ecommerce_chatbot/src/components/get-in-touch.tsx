import Image from "next/image";
import Button from "./button";

export default function GetInTouch() {
  return (
    <div className="lg:flex">
      <div className="container text-body-md space-y-6 md:space-y-6 md:pt-2 pt-10 lg:pt-20 md:w-[600px]">
        <p className="font-display text-custom-h4">
          From a studio in London to a global brand with over 400 outlets
        </p>
        <p className="text-body-sm md:text-body-md">
          When we started Avion, the idea was simple. Make high quality
          furniture affordable and available for the mass markert.{" "}
        </p>

        <p className="text-body-sm md:text-body-md lg:w-[490px]">
          Handmade, and lovingly crafted furniture and homeware is what we live
          breathe and design so our Chelsea boutique become the hotbed for the
          London interior design community
        </p>
        <div className="pt-8 md:py-16 lg:pt-36 text-body-md">
          <Button text="Get in touch" color="bg-light-grey" />
        </div>
      </div>
      <div>
        <Image
          className="mt-10 md:m-0"
          src="/Image.png"
          alt=""
          height={603}
          width={720}
        />
      </div>
    </div>
  );
}
