
"use client"

import { useState, useEffect } from "react";
import Button from "@/components/button";
import RelatedProducts from "@/components/related-products";
import Navbar2 from "@/components/navbar-2";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Product } from "@/types/product";
import { addToCart } from "@/app/actions/actions";
import Swal from "sweetalert2";

interface IProduct {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: string;
  price: number;
  quantity: number;
  description: string;
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  category: {
    _ref: string;
  };
}

export default function ProductDetails({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productQuery = `
        *[_type == "product" && slug.current == $slug][0]{
          _id,
          name,
          slug,
          "image": image.asset->url,
          price,
          quantity,
          description,
          dimensions,
          category
        }
      `;
      const fetchedProduct = await client.fetch(productQuery, { slug: params.slug });
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [params.slug]);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddtoCart = (e: React.MouseEvent, product: IProduct) => {
    e.preventDefault();

    const convertedProduct: Product = {
      _id: product._id,
      productName: product.name,
      _type: "products",
      image: product.image ? { asset: { _ref: product.image, _type: "image" } } : undefined,
      price: product.price,
      description: product.description,
      slug: {
        _type: "slug",
        current: product.slug.current
      },
      quantity: product.quantity,
    };

    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1000,
    });

    addToCart(convertedProduct);
  };

  return (
    <main>
      <Navbar2 />
      <div className="bg-light-grey">
        <div className="container md:py-2 lg:flex lg:justify-between lg:items-center">
          <div className="w-[400px] h-[400px] md:w-[800px] md:h-[500px]">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              loading="lazy"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-5 lg:space-y-3 container mr-24">
            <div className="pt-5 md:pt-12 lg:pt-4">
              <p className="text-custom-h3 md:text-custom-h1 font-display">{product.name}</p>
              <p className="text-custom-h4 md:text-custom-h3">${product.price}</p>
            </div>
            <hr />
            <div className="space-y-1">
              <p className="font-display text-body-md">Product Description</p>
              <p className="text-body-sm">{product.description}</p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-body-md">Dimensions</p>
              <div className="text-body-sm flex gap-x-12">
                <div>
                  <p className="font-display text-body-md">Height</p>
                  <p className="text-body-md">{product.dimensions.height}</p>
                </div>
                <div className="h-11 w-[1px] bg-border-grey mt-2"></div>
                <div>
                  <p className="font-display text-body-md">Width</p>
                  <p className="text-body-md">{product.dimensions.width}</p>
                </div>
                <div className="h-11 w-[1px] bg-border-grey mt-2"></div>
                <div>
                  <p className="font-display text-body-md">Depth</p>
                  <p className="text-body-md">{product.dimensions.depth}</p>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-display text-body-md">Quantity</p>
              <button className="px-12 py-2 bg-white text-body-sm">{product.quantity}</button>
            </div>
            <div className="flex gap-x-6 md:pb-10 lg:pt-7 text-body-md">
              <span className="text-white">
                <Button text="Add to cart" color="bg-dark-primary" onClick={(e) => handleAddtoCart(e, product)} />
              </span>
              <span className="text-dark-primary">
                <Button text="Save to favorites " color="bg-white" />
              </span>
            </div>
          </div>
        </div>
        <div className="pb-2 md:p-0">
          <RelatedProducts params={{ slug: params.slug }} />
        </div>
      </div>
    </main>
  );
}
