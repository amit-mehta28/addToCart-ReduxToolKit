import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./features/ProductSlice";
import CartSlice from "./features/CartSlice";


export const store = configureStore({
    reducer: {
        products: ProductSlice,
        cart: CartSlice,
    }
})