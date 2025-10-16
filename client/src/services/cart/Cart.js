import { baseApi } from "../baseApi";

export const Cart = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCarts: builder.query({
            query: (id) => ({
                url: `carts/${id}`,
                method: "GET",
            }),
            providesTags: ["CARTS"],
            transformResponse: (response) => response?.data,
        }),
        addToCart: builder.mutation({
            query: (payload) => ({
                url: "carts",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["CARTS"],
        }),
        deleteCartItem: builder.mutation({
            query: (payload) => ({
                url: "carts",
                method: "DELETE",
                body: payload,
            }),
            invalidatesTags: ["CARTS"],
        }),
        proceedCheckout: builder.mutation({
            query: (payload) => ({
                url: `carts/clear/${payload}`,
                method: "DELETE",
                body: payload,
            }),
            invalidatesTags: ["CARTS"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddToCartMutation,
    useGetAllCartsQuery,
    useDeleteCartItemMutation,
    useProceedCheckoutMutation,
} = Cart;
