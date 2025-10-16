import { baseApi } from "../baseApi";

export const Products = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "products",
                method: "GET",
            }),
            transformResponse: (response) => response.data,
        }),
        getProductById: builder.query({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: "GET",
            }),
            transformResponse: (response) => response.data,
        }),
    }),
    overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductByIdQuery } = Products;
