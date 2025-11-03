export default function Club() {
  return (
    <div className="h-[294px] md:h-[481px] flex justify-center items-center md:bg-border-grey mt-10">
      <div className="container">
        <div className="w-full max-w-screen-xl md:h-[364px] pt-10 flex flex-col md:justify-center md:items-center gap-y-4 bg-white ">
          <p className="text-custom-h4 lg:text-custom-h2 font-display ">
            Join the club and get the benefits
          </p>
          <p className="text-body-md w-[350px] lg:w-[420px] lg:text-center">
            Sign up for our newsletter and exclusive offers on new ranges,
            sales, pop-up stores, and more.
          </p>
          <div className="flex pt-10 pb-4 lg:pb-20">
            <input
              className=" px-6 text-body-md bg-light-grey h-[54px] lg:w-[354px]"
              type="text"
              placeholder="Enter your Email"
            />
            <button className="bg-dark-primary px-4  text-body-md text-white h-[54px] lg:w-[118px]">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
