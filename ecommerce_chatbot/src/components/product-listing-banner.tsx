import Image from "next/image";
import Button from "./button";

export default function ProductListingBanner() {
  return (
    <div className="hidden md:flex">
      <div>
        <Image
          className="m-0 lg:mt-10 md:m-0"
          src="/Image (8).png"
          alt=""
          height={521}
          width={720}
        />
      </div>

      <div className="container text-body-md space-y-6 md:pt-2 pt-10 lg:pt-24 md:w-[600px] flex flex-col justify-between">
        <div>
        <p className="font-display text-custom-h4 lg:text-custom-h2 pt-4">
          Join the club and get the benefits
        </p>
        <p className="text-body-sm lg:text-body-md">
            Sign up for our newsletter and receive exlusive offers now on new ranges, sales and pop up stores and more.
        </p>
        </div>
        <div className="flex lg:pt-10 pb-20">
            <input
              className="px-6 text-body-md bg-light-grey h-[54px] lg:w-[354px]"
              type="text"
              placeholder="Enter your Email"
            />
            <button className="bg-dark-primary px-4  text-body-md text-white h-[54px] w-[86px] lg:w-[118px]">
              Sign up
            </button>
          </div>

      </div>
    </div>
  );
}
