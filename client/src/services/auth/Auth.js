import { baseApi } from "../baseApi";

export const Auth = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "users/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["LOGIN"],
        }),
        signup: builder.mutation({
            query: (payload) => ({
                url: "users/signup",
                method: "POST",
                body: payload,
            }),
        }),
        authUser: builder.query({
            query: () => ({
                url: "users/authUser",
                method: "GET",
            }),
            providesTags: ["LOGIN"],
        }),
        newsletterModal: builder.mutation({
            query: (payload) => ({
                url: "users/newsletter",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["LOGIN"],
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useAuthUserQuery, useNewsletterModalMutation } =
    Auth;
