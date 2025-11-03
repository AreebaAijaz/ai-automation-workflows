import {
  IoLogoLinkedin,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoSkype,
  IoLogoTwitter,
  IoLogoPinterest,
} from "react-icons/io";

export default function Footer() {
  return (
    <div className="h-auto lg:h-[380px] bg-dark-primary text-white">
      <div className="container lg:flex justify-between pt-12 pb-7">
        <div className="flex gap-x-8 lg:gap-x-28 gap-y-8 md:justify-between md:mx-10 lg:mx-0">
          {/* Menu */}
          <div>
            <p className="font-display text-[16px]">Menu</p>
            <ul className="text-body-sm space-y-3 pt-5">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Recently Viewed</li>
              <li>Popular this week</li>
              <li>All products</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="font-display text-[16px]">Categories</p>
            <ul className="text-body-sm space-y-3 pt-5">
              <li>Crockery</li>
              <li>Furniture</li>
              <li>Homeware</li>
              <li>Plant pots</li>
              <li>Chairs</li>
            </ul>
          </div>

          {/* Our Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-[16px]">Company</p>
            <ul className="text-body-sm space-y-3 pt-5">
              <li>About us</li>
              <li>Vacancies</li>
              <li>Contact us</li>
              <li>Privacy</li>
              <li>Return Policy</li>
            </ul>
          </div>
        </div>

        {/* Mailing List */}
        <div>
          <div className="my-10 md:mb-6 lg:my-16 md:mx-10 lg:mx-0">
            <p className="font-display text-body-md">Join our mailing list</p>
            <div className="flex items-start justify-start mt-4">
              <input
                className="py-2 px-4 text-body-md bg-white/15 w-[327px] h-[56px]"
                type="text"
                placeholder="your@email.com"
              />
              <button className="text-dark-primary px-4 py-1 text-body-md w-[118px] h-[56px] bg-white">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container h-[1px] bg-nav w-full mb-6 md:mb-0  lg:mt-7"></div>

      {/* Footer Bottom */}
      <div className="container flex justify-center md:justify-between pb-4 md:px-10 lg:px-0 lg:pb-0 md:pt-2 lg:pt-4">
        <div className="text-body-sm sm:text-center">
          Copyright 2022 Avion LTD
        </div>
        <div className="hidden md:flex justify-between gap-x-4">
          <IoLogoLinkedin className="h-[24px] w-[24px]" />
          <IoLogoFacebook className="h-[24px] w-[24px]" />
          <IoLogoInstagram className="h-[24px] w-[24px]" />
          <IoLogoSkype className="h-[24px] w-[24px]" />
          <IoLogoTwitter className="h-[24px] w-[24px]" />
          <IoLogoPinterest className="h-[24px] w-[24px]" />
        </div>
      </div>
    </div>
  );
}
