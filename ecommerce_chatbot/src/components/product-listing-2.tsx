import { RiArrowDropDownFill } from "react-icons/ri";
import Image from "next/image";
import Button from "./button";
import { Fullscreen } from "lucide-react";
const ProductDescription = [
  {
    id: 1,
    title: "The Dandy Chair",
    price: "£250",
    Image: "/Photo (6).png",
  },
  {
    id: 2,
    title: "Rustic Vase Set",
    price: "£155",
    Image: "/Parent (1).png",
  },
  {
    id: 3,
    title: "The Silky Vase",
    price: "£125",
    Image: "/Parent (2).png",
  },
  {
    id: 4,
    title: "The Lucky Lamp",
    price: "£399",
    Image: "/Photo (7).png",
  },
  {
    id: 5,
    title: "The Dandy Chair",
    price: "£250",
    Image: "/Photo (6).png",
  },
  {
    id: 6,
    title: "Rustic Vase Set",
    price: "£155",
    Image: "/Parent (1).png",
  },
  {
    id: 7,
    title: "The Silky Vase",
    price: "£125",
    Image: "/Parent (2).png",
  },
  {
    id: 8,
    title: "The Lucky Lamp",
    price: "£399",
    Image: "/Photo (7).png",
  },
  {
    id: 9,
    title: "The Dandy Chair",
    price: "£250",
    Image: "/Photo (6).png",
  },
  {
    id: 10,
    title: "Rustic Vase Set",
    price: "£155",
    Image: "/Parent (1).png",
  },
  {
    id: 11,
    title: "The Silky Vase",
    price: "£125",
    Image: "/Parent (2).png",
  },
  {
    id: 12,
    title: "The Lucky Lamp",
    price: "£399",
    Image: "/Photo (7).png",
  },
];

export default function ProductListingPage2() {
  return (
    <main className="">
      <div className="bg-light-grey md:bg-white">
        <div className="head h-[204px] md:h-auto">
            <Image src="/Frame 143.png" alt="" height={209} width={400}/>
        <div className="flex justify-center gap-x-2 pt-10 md:hidden">
            <button className="px-9 py-4 flex justify-center items-center gap-x-2 bg-white">Sorting <RiArrowDropDownFill /></button>
            <button className="px-9 py-4 flex justify-center items-center gap-x-2 bg-white">Filtering <RiArrowDropDownFill /></button>
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center lg:h-[64px] lg:mx-20 py-6 lg:py-2">
        <ul className="flex gap-x-4 lg:gap-x-12 text-body-md">
          <li className="flex gap-x-1 justify-between items-center">
            Category <RiArrowDropDownFill />
          </li>
          <li className="flex gap-x-1 justify-between items-center">
            Product type <RiArrowDropDownFill />
          </li>
          <li className="flex gap-x-1 justify-between items-center">
            Price <RiArrowDropDownFill />
          </li>
          <li className="flex gap-x-1 justify-between items-center">
            Brand <RiArrowDropDownFill />
          </li>
        </ul>
        <p className="text-body-md flex gap-x-6 lg:gap-x-10">
          Sorting by:{" "}
          <span className="text-body-sm flex gap-x-1 justify-between items-center">
            Date added <RiArrowDropDownFill />
          </span>
        </p>
      </div>
      </div>
      <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-8 mt-6">
      {ProductDescription.slice(0,6).map((icon) => {
          return (
            <div key={icon.id} className="space-y-2 lg:hidden">
              <Image src={icon.Image} alt="" height={375} width={305} />
              <p className="font-display text-custom-h4">{icon.title}</p>
              <p className="text-body-lg">{icon.price}</p>
            </div>
          );
        })}

        {ProductDescription.map((icon) => {
          return (
            <div key={icon.id} className="space-y-2 hidden lg:block">
              <Image src={icon.Image} alt="" height={375} width={305} />
              <p className="font-display text-custom-h4">{icon.title}</p>
              <p className="text-body-lg">{icon.price}</p>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-6 mb-10">
        <Button text="View Collection" color="bg-light-grey" />
      </div>
      </div>
    </main>
  );
}
