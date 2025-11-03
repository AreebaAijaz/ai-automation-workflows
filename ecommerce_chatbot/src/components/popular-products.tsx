"use client"
import { useEffect, useState } from "react";
import Button from "@/components/button";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; // Import the urlFor helper

// Define the IProduct interface
interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: {
    current: string;
  };
}

const PopularProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]); // State to store the products
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state

  // Fetch data inside useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && "popular products" in tags]{
          _id,
          name,
          slug,
          image,
          price,
          quantity,
          tags
        }`;

        const fetchedProducts: IProduct[] = await client.fetch(query); // Ensure that the data matches the IProduct type
        setProducts(fetchedProducts); // Update state with fetched products
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts(); // Call the fetch function on component mount
  }, []); 

  if (loading) {
    return <p>Loading...</p>; // Show loading state until data is fetched
  }

  return (
    <div className="container my-10 lg:my-8">
      <p className="font-display text-custom-h2">Our Popular Products</p>
      <div className="flex justify-between gap-x-8 my-5 lg:my-10">
  {products.map((item, index) => {
    return (
      <Link href={`/products/${item.slug.current}`} key={item._id}>
        <div className={`space-y-3 ${index === 0 ? "hidden md:block" : ""}`}>
          {/* Wrapper div with conditional width */}
          <div className={`w-[${index === 0 ? "700px" : "305px"}] h-[375px] overflow-hidden`}>
            <Image
              src={urlFor(item.image).url()}
              alt={item.name}
              height={375}
              width={index === 0 ? 700 : 305}
              loading="lazy"
              className="object-cover"
            />
          </div>
          <p className="font-display text-custom-h4">{item.name}</p>
          <p className="text-body-lg">{item.price}</p>
        </div>
      </Link>
    );
  })}
</div>

      <div className="text-center text-body-md">
        <Button text="View Collection" color="bg-light-grey" />
      </div>
    </div>
  );
};

export default PopularProducts;




