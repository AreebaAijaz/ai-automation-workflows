"use client";
import { useState, useEffect } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: any;
  slug: any;
  _createdAt: string;
}

interface ICategory {
  _id: string;
  name: string;
}

export default function ProductListingPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search query
  const [isLoading, setIsLoading] = useState(true);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.ceil(products.length / 3); // Adjust pagination for 3 pages

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await client.fetch(`*[_type == "category"] { _id, name }`);
        setCategories(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products whenever filters or sort order change
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const query = `*[_type == "product" ${selectedCategory ? `&& references("${selectedCategory}")` : ""
          } ${priceFilter === "below300"
            ? "&& price < 300"
            : priceFilter === "above300"
              ? "&& price >= 300"
              : ""
          } && name match "${searchQuery}*" ] | order(_createdAt ${sortOrder === "older" ? "asc" : "desc"
          }) {
          _id,
          name,
          price,
          "image": image.asset->url,
          slug,
          _createdAt
        }`;
        const result = await client.fetch(query);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, priceFilter, sortOrder, searchQuery]); // Add searchQuery as a dependency

  const filteredProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <main>
      <div className="bg-light-grey md:bg-white">
        <div className="head h-[100px] md:h-auto ">
          <p className="font-display text-custom-h2 lg:text-custom-h1 text-center pt-8">
            View All Products
          </p>
        </div>

        {/* Filters Row */}
        <div className="md:container lg:max-w-none md:flex gap-x-16 items-center lg:h-[64px] py-6 lg:py-2 gap-8">

          <div className="flex gap-x-6 md:gap-x-10 pb-4">
          {/* Category Filter */}
          <div className="relative">
            <button
              className="flex gap-x-1 items-center"
              onClick={() => setCategoryDropdownOpen((prev) => !prev)}
            >
              Category <RiArrowDropDownFill />
            </button>
            {categoryDropdownOpen && (
              <ul className="absolute top-full left-0 bg-white border rounded-md shadow-lg w-40 z-10">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category._id);
                      setCategoryDropdownOpen(false);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(null);
                    setCategoryDropdownOpen(false);
                  }}
                >
                  All Categories
                </li>
              </ul>
            )}
          </div>

          {/* Price Filter */}
          <div className="relative">
            <button
              className="flex gap-x-1 items-center"
              onClick={() => setPriceDropdownOpen((prev) => !prev)}
            >
              Price <RiArrowDropDownFill />
            </button>
            {priceDropdownOpen && (
              <ul className="absolute top-full left-0 bg-white border rounded-md shadow-lg w-40 z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPriceFilter("below300");
                    setPriceDropdownOpen(false);
                  }}
                >
                  Below $300
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPriceFilter("above300");
                    setPriceDropdownOpen(false);
                  }}
                >
                  Above $300
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPriceFilter(null);
                    setPriceDropdownOpen(false);
                  }}
                >
                  All Prices
                </li>
              </ul>
            )}
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <button
              className="flex gap-x-1 items-center"
              onClick={() => setSortDropdownOpen((prev) => !prev)}
            >
              Sort <RiArrowDropDownFill />
            </button>
            {sortDropdownOpen && (
              <ul className="absolute top-full left-0 bg-white border rounded-md shadow-lg w-40 z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSortOrder("older");
                    setSortDropdownOpen(false);
                  }}
                >
                  Older to Newest
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSortOrder("newer");
                    setSortDropdownOpen(false);
                  }}
                >
                  Newest to Older
                </li>
              </ul>
            )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="ml-auto mr-3 flex justify-end">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-md p-2"
              autoFocus // Ensure the input remains focused
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container pb-8 md:p-0">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-8 mt-6">
            {filteredProducts.map((product) => (
              <Link href={`/products/${product.slug.current}`} key={product._id}>
                <div>
                  <div className="relative h-[225px] w-full  md:w-full md:h-[375px] overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="font-display text-custom-h4">{product.name}</p>
                    <p className="text-body-lg">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-lg font-semibold text-gray-600">No results found.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 7 && (
          <div className="flex justify-center mt-6 mb-10">
            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-1 mx-1 rounded-md ${currentPage === index + 1
                  ? "bg-dark-primary text-white"
                  : "bg-gray-200"
                  }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
