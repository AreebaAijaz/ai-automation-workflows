import Image from "next/image";
import Button from "./button";

export default function GetInTouch2() {
  return (
    <div className="lg:flex">
      <div>
        <Image
          className="m-0  md:m-0"
          src="/Image (2).png"
          alt=""
          height={603}
          width={720}
        />
      </div>

      <div className="container text-body-md space-y-6 md:py-12 pt-10 lg:pt-24 md:w-[600px]">
        <p className="font-display text-custom-h3">
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
        <div className="text-body-md py-8 md:py-12 lg:pt-36">
          <Button text="Get in touch" color="bg-light-grey" />
        </div>
      </div>
    </div>
  );
}
