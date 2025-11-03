import Image from "next/image";
import Button from "./button";


export default function ProductDetails() {
  return (
    <main>
      <div className=" bg-light-grey ">
        <div className="container md:py-10 p-0 lg:flex lg:justify-between lg:items-center">
          <div>
            <Image src="/Product Image.png" alt="" height={1900} width={960} />
          </div>
          {/* details */}
          <div className="space-y-5 lg:space-y-3 container mr-24">
            <div className="pt-5 md:pt-8 lg:p-0">
              <p className="text-custom-h3 md:text-custom-h1 font-display">The Dandy Chair </p>
              <p className="text-custom-h4 md:text-custom-h3">£250</p>
            </div>
            <hr />
            <div className="space-y-1 md:space-y-5">
              <p className="font-display text-body-md">Product Description</p>
              <p className="text-body-md">
                A timeless design with premium materials features as one of our
                most porpular and iconic pieces. The dandy chair is perfect for
                any stylish living space with beach legs and lambskin leather
                upholstery.
              </p>
            </div>
            {/* Dimension */}
            <div className="space-y-1">
              <p className="font-display text-body-md">Dimensions</p>
              <div className="text-body-sm flex gap-x-12">
                <div className="space-y-2">
                  <p className="font-display text-body-md">Height</p>
                  <p className="text-body-md">110cm</p>
                </div>
                <div className="h-11 w-[1px] bg-border-grey mt-2"></div>
                <div className="space-y-1">
                  <p font-display text-body-md>
                    width
                  </p>
                  <p className="text-body-md">75cm</p>
                </div>
                <div className="h-11 w-[1px] bg-border-grey mt-2"></div>
                <div className="space-y-1">
                  <p font-display text-body-md>
                    Depth
                  </p>
                  <p className="text-body-md">50cm</p>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-display text-body-md">Quantity</p>
              <button className="px-16 py-2 bg-white text-body-sm ">1</button>
            </div>
            <div className="flex gap-x-6 pb-10 lg:pt-7 text-body-md">
              <span className="text-white">
                <Button text="Add to cart" color="bg-dark-primary" />
              </span>
              <span className="text-dark-primary">
                <Button text="save to favorites" color="bg-white" />
              </span>
            </div>
          </div>
          {/* finish */}
        </div>
      </div>

    </main>
  );
}


// const Products = [
//   {
//     id: 1,
//     title: "The popular Suede Sofa",
//     price: "£980",
//     Image: "/Large.png",
//   },
//   {
//     id: 2,
//     title: "The Dandy chair",
//     price: "£250",
//     Image: "/Photo.png",
//   },
//   {
//     id: 1,
//     title: "The Dandy Chair",
//     price: "£125",
//     Image: "/Photo (5).png",
//   },
// ];

{/* <div className="container my-20">
<p className="text-custom-h2 font-display">You might also love these</p>
<div className="flex justify-between items-center gap-x-8 gap-y-4 my-10 ">
  {Products.map((Item, index) => {
    return (
      <div
        key={Item.id}
        className={`space-y-1 lg:space-y-3 ${
          index === 0 ? 'block lg:block hidden' : 'block'
        }`}
      >
        <Image
          src={Item.Image}
          alt=""
          height={375}
          width={index === 0 ? 630 : 305}
        />
        <p className="font-display text-custom-h4">{Item.title}</p>
        <p className="text-body-lg">{Item.price}</p>
      </div>
    );
  })}
</div>
<div className="text-center text-body-md">
  <Button text="See Collection" color="bg-light-grey" />
</div>
</div> */}
