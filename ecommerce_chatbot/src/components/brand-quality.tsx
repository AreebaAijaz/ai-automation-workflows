import { CreditCard, CircleCheck, Sprout } from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";

export default function BrandQuality() {
  return (
    <div className="container my-16 lg:my-10">
      <div>
        <p className="md:text-center text-custom-h4 lg:text-custom-h3 lg:pt-4 font-display ">
          What makes our brand different
        </p>
      </div>
      <div className="my-8 space-y-10 lg:space-y-0 md:grid grid-cols-2 md:justify-center md:items-center lg:flex justify-between items-center gap-x-6">
        <div className="space-y-2 h-[116px] lg:h-[244px] lg:w-[305px] bg-white lg:px-6 lg:py-12 lg:bg-light-grey md:mx-auto">
          <TbTruckDelivery className="h-[24px] w-[24px]" />
          <p className="font-display text-custom-h5">Next day as standard</p>
          <p className="text-body-sm md:text-body-md max-w-72">
            Order before 3pm and get your order the next day as standard
          </p>
        </div>

        <div className="space-y-2 h-[116px] lg:h-[244px] lg:w-[305px] bg-white lg:px-6 lg:py-12 lg:bg-light-grey md:mx-auto">
          <CircleCheck className="h-[24px] w-[24px]" />
          <p className="font-display text-custom-h5">Made with artisans</p>
          <p className="text-body-sm md:text-body-md max-w-72">
            Handmade crafted goods made with real passion and craftsmanship
          </p>
        </div>

        <div className="space-y-2 h-[116px] lg:h-[244px] lg:w-[305px] bg-white lg:px-6 lg:py-12 lg:bg-light-grey md:mx-auto">
          <CreditCard className="h-[24px] w-[24px]" />
          <p className="font-display text-custom-h5">Unbeatable Prices</p>
          <p className="text-body-sm md:text-body-md max-w-72">
            For our materials and quality you won&apos;t find better prices
            anywhere.
          </p>
        </div>

        <div className="space-y-2 h-[116px] lg:h-[244px] lg:w-[305px] bg-white lg:px-6 lg:py-12 lg:bg-light-grey md:mx-auto">
          <Sprout className="h-[24px] w-[24px]" />
          <p className="font-display text-custom-h5">Next day as standard</p>
          <p className="text-body-sm md:text-body-md max-w-72">
            We use 100% recycled packing to ensure our footprint is manageable
          </p>
        </div>
      </div>
    </div>
  );
}
