// import { client } from "@/sanity/lib/client";
// import Image from "next/image";
// import Link from "next/link";

// interface IProduct {
//     _id: string;
//     name: string;
//     slug: {
//       current: string;
//     };
//     image: string;
//     price: number;
//     quantity: number;
//     description: string;
//     dimensions: {
//       height: string;
//       width: string;
//       depth: string;
//     };
//     category: {
//       _ref: string;
//     };
//   }
  

//   export default async function RelatedProducts({ params }: { params: { slug: string } }) {
//     // Fetch the product first to get its category
//     const productQuery = `
//       *[_type == "product" && slug.current == $slug][0]{
//         _id,
//         name,
//         "image": image.asset->url,
//         price,
//         slug,
//         category
//       }
//     `;
  
//     const product: IProduct | null = await client.fetch(productQuery, { slug: params.slug });
  
//     if (!product) {
//       return <p>Product not found.</p>;
//     }
  
//     // Fetch related products using the product's category
//     const relatedProductsQuery = `
//       *[_type == "product" && category._ref == $categoryId && slug.current != $currentSlug][0...4]{
//         _id,
//         name,
//         "image": image.asset->url,
//         price,
//         slug
//       }
//     `;
  
//     const relatedProducts: IProduct[] = await client.fetch(relatedProductsQuery, {
//       categoryId: product.category._ref,
//       currentSlug: params.slug,
//     });
  
//     return (
//       <div>
//         {relatedProducts.length > 0 && (
//           <div className="container my-16">
//             <h2 className="text-custom-h2 font-display mb-5">You might also like</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//               {relatedProducts.map((relatedProduct) => (
//                 <Link key={relatedProduct._id} href={`/products/${relatedProduct.slug.current}`} passHref>
//                   <div className="relative h-[280px] w-[280px] overflow-hidden">
//                     <Image
//                       src={relatedProduct.image}
//                       alt="Related product"
//                       layout="fill"
//                       objectFit="cover"
//                       loading="lazy"
//                       className="transition-transform transform hover:scale-110"
//                     />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

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

export default function RelatedProducts({ params }: { params: { slug: string } }) {
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const productQuery = `
        *[_type == "product" && slug.current == $slug][0]{
          _id,
          name,
          "image": image.asset->url,
          price,
          slug,
          category
        }
      `;
      
      const product: IProduct | null = await client.fetch(productQuery, { slug: params.slug });

      if (product) {
        const relatedProductsQuery = `
          *[_type == "product" && category._ref == $categoryId && slug.current != $currentSlug][0...4]{
            _id,
            name,
            "image": image.asset->url,
            price,
            slug
          }
        `;
        
        const relatedProducts: IProduct[] = await client.fetch(relatedProductsQuery, {
          categoryId: product.category._ref,
          currentSlug: params.slug,
        });

        setRelatedProducts(relatedProducts);
      }

      setLoading(false);
    };

    fetchRelatedProducts();
  }, [params.slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {relatedProducts.length > 0 && (
        <div className="container my-16">
          <h2 className="text-custom-h2 font-display mb-5">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct._id} href={`/products/${relatedProduct.slug.current}`} passHref>
                <div className="relative h-[280px] w-[280px] overflow-hidden">
                  <Image
                    src={relatedProduct.image}
                    alt="Related product"
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                    className="transition-transform transform hover:scale-110"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
