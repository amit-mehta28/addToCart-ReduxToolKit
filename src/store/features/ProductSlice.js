import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const featchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(featchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(featchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(featchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default productSlice.reducer;