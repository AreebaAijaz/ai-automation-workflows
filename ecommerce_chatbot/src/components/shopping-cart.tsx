import Image from "next/image"
import Button from "./button"
export default function ShoppingCartPage(){
    return(
        <div className="lg:h-[749px] bg-light-grey">
            <div className="container lg:px-28">
            <div className="py-8 lg:py-14">
                <p className="font-display text-custom-h3 lg:text-custom-h1">Your Shopping Cart</p>
            </div>
            {/* headings */}
            <div className="hidden lg:flex justify-between font-display text-custom-h5 pb-3">
                <p>Product</p>
                <p className="pl-64">Quantity</p>
                <p>Total</p>
            </div>
            <hr />
            {/* product-description */}
            <div className="py-5 space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-4">
                    <Image src="/Product Image (2).png" alt="" height={50} width={100} />
                    <div className="lg:py-4 lg:space-y-1">
                        <p className="font-display text-custom-h6 lg:text-custom-h4">Graystone Vase</p>
                        <p className="text-body-sm w-[180px]">A timeless ceramic vase with a tri color gray graze.</p>
                        <p className="text-body-md">£85</p>
                        <p className="lg:hidden pl-20 mt-2 text-body-md">1</p>

                    </div>
                </div>
                <p className="hidden lg:block text-body-md pl-24">1</p>
                <p className="hidden lg:block lg:text-body-lg">£85</p>

            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-x-4">
                <Image src="/Product Image (1).png" alt="" height={50} width={100} />
                <div className="lg:py-4 lg:space-y-1">
                        <p className="font-display text-custom-h6 lg:text-custom-h4">Graystone Vase</p>
                        <p className="text-body-sm w-[180px]">A timeless ceramic vase with a tri color gray graze.</p>
                        <p className="text-body-md">£85</p>
                        <p className="lg:hidden pl-20 mt-2 text-body-md">1</p>
                    </div>
                </div>
                <p className="hidden lg:block text-body-md pl-24">1</p>
                <p className="hidden lg:block lg:text-body-lg">£85</p>
            </div>
            </div>
            <hr />
            <div className="text-end py-4 lg:py-10 space-y-2">
                <p className="text-custom-h4">Subtotal <span className="font-display text-custom-h3 pl-3">£210</span></p>
                <p className="text-body-sm">Taxes and shippings are calculated at checkout</p>
                <div className="text-white"><Button text="go to checkout" color="bg-dark-primary"/></div>
            </div>
            </div>

        </div>
    )
}
