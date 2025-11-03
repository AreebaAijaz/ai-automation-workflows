
import { Product } from "@/types/product"



export const addToCart = (product: Product) => {
    const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            image: product.image ? { asset: { _ref: product.image.asset._ref, _type: "image" } } : undefined, // ✅ Correct format
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};


export const removeFromCart = (productId : string) => {
    let cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id !== productId)
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const updateCartQuantity = (productId :string, quantity : number) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item._id === productId)

    if(productIndex > -1) {
        cart[productIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

// export const getCartItems = () : Product[] => {
//     return JSON.parse(localStorage.getItem('cart') || '[]')
// }

export const getCartItems = (): Product[] => {
    const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    return cart.map(item => ({
        ...item,
        image: item.image
            ? { asset: { _ref: item.image.asset._ref, _type: "image" } } // ✅ Ensure correct structure
            : undefined,
    }));
};
