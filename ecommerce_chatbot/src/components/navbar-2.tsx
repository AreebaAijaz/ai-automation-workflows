"use client"
import { TbTruckDelivery } from "react-icons/tb";
import { Search, ShoppingCart, CircleUserRound } from "lucide-react";
import { IoMenu } from "react-icons/io5";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getCartItems } from "@/app/actions/actions";
import { useEffect, useState } from "react";


export default function Navbar2() {
      const [cartQuantity, setCartQuantity] = useState(0);
    
      useEffect(() => {
        const cartItems = getCartItems();
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartQuantity(totalQuantity);
      }, []);

  return (
    <main>
    <div className="hidden lg:block">
      <div className="h-[41px] bg-dark-primary text-white flex gap-x-2 justify-center items-center">
        <TbTruckDelivery className="h-[16px] w-[16px]" />
        <p className="text-body-sm">
          Free delivery on all orders above £50 with code easier checkout
        </p>
      </div>

      <div className="container h-[80px] flex justify-between items-center">
        <p className="font-display text-clash-regular">Avion</p>
        <ul className="flex gap-x-8 text-body-md text-nav mr-28">
        <Link href="/">Plant Pots</Link>
          <Link href="/home2">Ceramics</Link>
          <Link href="/product-v3">Tables</Link>
          <Link href="/about">Chairs</Link>
          <Link href="/product-landing">Crockery</Link>
          <Link href="/product-listing">Tableware</Link>
          <Link href="/product-listing-2">Cutlery</Link>
        </ul>
        <div className="flex gap-x-4">
          <Search className="h-[16px] w-[16px]" />
          <div className="flex gap-x-4 relative">
          <div className="relative">
                <Link href="/shopping-cart">
                  <div className="relative">
                    <ShoppingCart className="w-[16px] h-[16px]" />
                    {cartQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {cartQuantity}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          <CircleUserRound className="h-[16px] w-[16px]" />
        </div>
      </div>
    </div>
          {/* sm view */}
          <div className="lg:hidden h-[64px] flex justify-between items-center mx-4">
        <p className="text-custom-h4">Avion</p>
        <div className="flex gap-x-4">
        <Search className="h-[16px] w-[16px]"/>
        <div className="relative">
              <ShoppingCart className="w-[16px] h-[16px]" />
              <Link
                href="/shopping-cart"
              >
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartQuantity}
                  </span>
                )}

              </Link>
            </div>        
        <CircleUserRound className="h-[16px] w-[16px]"/>
        <Sheet>
  <SheetTrigger><IoMenu /></SheetTrigger>
  <SheetContent className="bg-white text-nav">
    <SheetHeader>
      <SheetTitle></SheetTitle>
      <SheetDescription>
        <ul className="text-body-lg space-y-4 flex flex-col pt-6">
        <Link href="/">Plant Pots</Link>
          <Link href="/home2">Ceramics</Link>
          <Link href="/product-v3">Tables</Link>
          <Link href="/about">Chairs</Link>
          <Link href="/product-landing">Crockery</Link>
          <Link href="/product-listing">Tableware</Link>
          <Link href="/product-listing-2">Cutlery</Link>
      </ul>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

        </div>
      </div>

    </main>
  );
}
