import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

export const ProductSlices = createSlice({
    name: "Products",
    initialState,
    reducers: {},
});

export default ProductSlices.reducer;
