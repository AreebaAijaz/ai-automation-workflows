


"use client";
import Button from "@/components/button";
import HomeNav from "@/components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import Swal from "sweetalert2";
import { Product } from "@/types/product";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const router = useRouter();
    useEffect(() => {
        setCartItems(getCartItems());
    }, []);

    const handleRemoveFromCart = (productId: string) => {
        removeFromCart(productId);
        setCartItems(getCartItems());
        Swal.fire({
            position: "center",
            title: "Item removed from cart",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const handleQuantityChange = (productId: string, quantity: number) => {
        updateCartQuantity(productId, quantity);
        setCartItems(getCartItems());
    };

    const handleIncrement = (productId: string) => {
        const product = cartItems.find((item) => item._id === productId);
        if (product) {
            handleQuantityChange(productId, product.quantity + 1);
        }
    };

    const handleDecrement = (productId: string) => {
        const product = cartItems.find((item) => item._id === productId);
        if (product && product.quantity > 1) {
            handleQuantityChange(productId, product.quantity - 1);
        }
    };

    const calculatedTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleProceed = () => {
        router.push("/checkout");
    }

    return (
        <main>
            <HomeNav />
            <div className="bg-light-grey">
                {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="font-display text-custom-h4">No items in the cart</p>
                    </div>
                ) : (
                    <div className="container lg:px-28">
                        <div className="py-8 lg:py-10">
                            <p className="font-display text-custom-h3 lg:text-custom-h1">Your Shopping Cart</p>
                        </div>
                        {/* headings */}
                        <div className="hidden lg:flex justify-between font-display text-custom-h5 pb-3">
                            <p>Product</p>
                            <p className="">Quantity</p>
                            <p className="">Total</p>
                        </div>
                        <hr />
                        {/* product-description */}
                        <div className="py-5 space-y-3">
                            {cartItems.map((item) => {
                                 console.log("Cart Item Image Reference:", item.image?.asset?._ref); // Debugging log
                                return(
                                <div key={item._id} className="flex justify-between items-center">
                                    <div className="flex gap-x-4">
                                        {item.image?.asset?._ref ? (
                                            <Image
                                                src={urlFor(item.image.asset._ref).url()}
                                                alt="Product Image"
                                                width={70}
                                                height={40}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}

                                        <div className="lg:py-4 lg:space-y-1">
                                            <p className="font-display text-custom-h6 lg:text-custom-h4 md:w-56">{item.productName}</p>
                                            <p className="text-body-md">£{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-2 p-0 md:pl-24">
                                        <button onClick={() => handleDecrement(item._id)} className="px-2 bg-gray-300 rounded">-</button>
                                        <p className="text-body-md">{item.quantity}</p>
                                        <button onClick={() => handleIncrement(item._id)} className="px-2 bg-gray-300 rounded">+</button>
                                    </div>
                                    <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-500">Remove</button>
                                    <p className="hidden lg:block lg:text-body-lg p-0 md:pl-44">£{item.price * item.quantity}</p>
                                </div>
                            )})}
                        </div>
                        <hr />
                        <div className="text-end py-4 lg:py-10 space-y-2">
                            <p className="text-custom-h4">Subtotal <span className="font-display text-custom-h3 pl-3">£{calculatedTotal()}</span></p>
                            <p className="text-body-sm">Taxes and shipping are calculated at checkout</p>
                            <div className="text-white">
                                <Button text="Go to checkout" color="bg-dark-primary" onClick={handleProceed}/>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}


