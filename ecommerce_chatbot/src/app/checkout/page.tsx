"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import { Product } from "@/types/product";
import Navbar2 from "@/components/navbar-2";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";


export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [discount, setDiscount] = useState<number>(0);
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        phone: "",
        email: "",
    });

    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        address: false,
        city: false,
        zipCode: false,
        phone: false,
        email: false,
    });

    useEffect(() => {
        setCartItems(getCartItems());
        const appliedDiscount = localStorage.getItem("appliedDiscount");
        if (appliedDiscount) {
            setDiscount(Number(appliedDiscount));
        }
    }, []);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const total = Math.max(subtotal - discount, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {
            firstName: !formValues.firstName,
            lastName: !formValues.lastName,
            address: !formValues.address,
            city: !formValues.city,
            zipCode: !formValues.zipCode,
            phone: !formValues.phone,
            email: !formValues.email,
        };
        setFormErrors(errors);
        return Object.values(errors).every((error) => !error);
    };

    const handlePlaceOrder = async () => {
        Swal.fire({
            title: "Your Order is Being Processed",
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: "bg-dark-primary",
            cancelButtonColor: "bg-grey",
        })

        const orderData = {
            _type : "order",
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            address: formValues.address,
            city: formValues.city,
            zipCode: formValues.zipCode,
            phone: formValues.phone,
            email: formValues.email,
            cartItems: cartItems.map((item) => ({
                _type: "reference",
                _ref: item._id,
            })),
            total : total,
            discount : discount,
            orderDate : new Date().toISOString(),
        }
        console.log("Order Data being sent:", orderData);

        try{
            await client.create(orderData);
            localStorage.removeItem('appliedDiscount');
        }
        catch(error){
            console.error('error creating order:', error);
        }
        Swal.fire({
            title: "Order has been Placed Successfully",
            icon: "success",
            confirmButtonText: "OK"
        }); 
            };

    return (
        <div>
            <Navbar2 />
        <div className={`min-h-screen bg-gray-50`}>
            {/* Breadcrumb */}
            <div className="mt-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 py-4">
                        <Link
                            href="/shopping-cart"
                            className="text-[#666666] hover:text-black transition text-sm"
                        >
                            Cart
                        </Link>
                        <CgChevronRight className="w-4 h-4 text-[#666666]" />
                        <span className="text-sm">Checkout</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-white border rounded-lg p-6 space-y-4">
                        <h2 className="text-lg font-display mb-4">Order Summary</h2>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 py-3 border-b"
                                >
                                    <div className="w-16 h-16 rounded overflow-hidden">
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

                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium">{item.productName}</h3>
                                        <p className="text-xs text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium">
                                        ${item.price * item.quantity}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm font-display text-gray-500">Your cart is empty.</p>
                        )}
                        <div className="text-right pt-4">
                            <p className="text-sm font-sans">
                                Subtotal: <span className="text-sm">${subtotal}</span>
                            </p>
                            <p className="text-sm font-sans">
                                Discount: <span className="txet-body-sm">-${discount}</span>
                            </p>
                            <p className="text-lg font-display">
                                Total: ${total.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Billing Form */}
                    <div className="bg-white border rounded-lg p-6 space-y-6">
                        <h2 className="text-xl font-display">Billing Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    value={formValues.firstName}
                                    onChange={handleInputChange}
                                />
                                {formErrors.firstName && (
                                    <p className="text-sm text-red-500">
                                        First name is required.
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name </label>
                                <input
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    value={formValues.lastName}
                                    onChange={handleInputChange}
                                />
                                {formErrors.lastName && (
                                    <p className="text-sm text-red-500">
                                        Last name is required.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address">Address </label>
                            <input
                                id="address"
                                placeholder="Enter your address"
                                value={formValues.address}
                                onChange={handleInputChange}
                            />
                            {formErrors.address && (
                                <p className="text-sm text-red-500">Address is required.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="city">City  </label>
                            <input
                                id="city"
                                placeholder="Enter your city"
                                value={formValues.city}
                                onChange={handleInputChange}
                            />
                            {formErrors.city && (
                                <p className="text-sm text-red-500">City is required.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="zipCode">Zip Code </label>
                            <input
                                id="zipCode"
                                placeholder="Enter your zip code"
                                value={formValues.zipCode}
                                onChange={handleInputChange}
                            />
                            {formErrors.zipCode && (
                                <p className="text-sm text-red-500">Zip Code is required.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="phone">Phone </label>
                            <input
                                id="phone"
                                placeholder="Enter your phone number"
                                value={formValues.phone}
                                onChange={handleInputChange}
                            />
                            {formErrors.phone && (
                                <p className="text-sm text-red-500">Phone is required.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email">Email </label>
                            <input
                                id="email"
                                placeholder="Enter your email address"
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                            {formErrors.email && (
                                <p className="text-sm text-red-500">Email is required.</p>
                            )}
                        </div>
                        <button
                            className="w-full h-12 bg-dark-primary rounded-md text-white"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}