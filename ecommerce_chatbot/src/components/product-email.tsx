import Image from "next/image";
export default function ProductEmail() {
  return (
    <main className="lg:flex">
      <div>
        <Image src="/Image (1).png" alt="" height={521} width={720} />
      </div>
      <div className="lg:h-[364px] lg:mx-16 flex flex-col justify-center items-center py-10 lg:py-20 gap-y-4 ">
        <p className="text-custom-h4 md:text-custom-h2 font-display">
          Join the club and get the benefits
        </p>
        <p className="text-body-sm md:text-body-md w-[300px] md:w-[420px] text-center ">
          Sign up for our newsletter and exclusive offers on new ranges, sales,
          pop-up stores, and more.
        </p>
        <div className="flex pt-6 lg:pt-52 text-body-md">
          <input
            className="py-2 px-4 text-body-md bg-light-grey h-[56px] w-[200px] lg:w-[354px]"
            type="text"
            placeholder="your@email.com"
          />
          <button className="bg-dark-primary px-4  h-[56px] w-[120px] lg:w-[118px] flex justify-center items-center text-body-md text-white whitespace-nowrap">
            Sign up
          </button>

        </div>
      </div>
    </main>
  );
}
