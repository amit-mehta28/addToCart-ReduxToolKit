import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("cart");
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load cart from local storage", e);
        return [];
    }
};

const saveCartToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state.items);
        localStorage.setItem("cart", serializedState);
    } catch (e) {
        console.warn("Could not save cart to local storage", e);
    }
};


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromLocalStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
            saveCartToLocalStorage(state);
        },

        clearCart: (state) => {
            state.items = [];
            saveCartToLocalStorage(state);
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;