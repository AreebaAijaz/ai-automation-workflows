
import { FaCircleCheck } from "react-icons/fa6";

export default function PageBanner() {
  return (
    <div className="h-[370px] lg:h-[444px] bg-about-footer bg-cover bg-center flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="space-y-6 text-white text-center w-[390px]">
          <p className="text-custom-h3 font-display">
            Join the club and get the benefits
          </p>
          <p className="text-body-sm w-[430px] md:w-[380px] lg:w-[470px] text-center pl-4">
            Sign up for our newsletter and receive exclusive offers, new ranges,
            sales, popup stores, and more.
          </p>
          <ul className="text-body-md flex  lg:gap-x-3 justify-between items-center text-center px-4 lg:px-0">
            <li className="flex lg:gap-x-1 justify-between items-center">
              <FaCircleCheck /> Exclusive offers
            </li>
            <li className="flex lg:gap-x-1 justify-between items-center">
              <FaCircleCheck /> Free events
            </li>
            <li className="flex lg:gap-x-1 justify-between items-center">
              <FaCircleCheck /> Large discounts
            </li>
          </ul>
        </div>
        <div className="flex h-full lg:w-[472px] mt-8 text-body-md">
          <input
            className="py-3 px-4 text-body-md bg-light-grey h-[40px] lg:h-[56px] w-[224px] lg:w-[354px]"
            type="text"
            placeholder="your@email.com"
          />
          <button className="bg-dark-primary flex items-center justify-center px-4 py-3 text-body-md h-[40px] lg:h-[56px] w-[90px]  lg:w-[118px] text-white">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
