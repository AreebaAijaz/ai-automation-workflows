



"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: {
    current: string;
  };
}

interface CeramicProps {
  HeaderProps: string;
}

export default function Ceramics({ HeaderProps }: CeramicProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // GROQ query to fetch products with the "new ceramics" tag
        const query = `
          *[_type == "product" && "new ceramics" in tags]{
            _id,
            name,
            price,
            "image": image.asset->url,
            slug
          }
        `;
        const data = await client.fetch(query);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (!loading && products.length === 0) {
    return <p>No products found.</p>;
  }
  
  return (
    <div className="container my-8">
      <p className="font-display text-custom-h2">{HeaderProps}</p>
      <div className="grid grid-cols-2 lg:flex justify-between items-center gap-x-3 gap-y-4 lg:gap-x-8 my-4">
        {products.map((product) => (
          <div key={product._id} className="space-y-1 lg:space-y-3">
            <Link href={`/products/${product.slug.current}`}>
              <Image
                src={product.image}
                alt={product.name}
                height={375}
                width={305}
                loading="lazy"
                className="rounded-md"
              />
              <div className="pt-4">
              <p className="font-display text-custom-h5 md:text-custom-h4">{product.name}</p>
              <p className="text-body-md md:text-body-lg">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center text-body-md">
        <Button text="View Collection" color="bg-light-grey" />
      </div>
    </div>
  );
}
