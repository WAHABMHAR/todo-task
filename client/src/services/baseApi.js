import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const envVar = import.meta.env;

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: envVar.VITE_BASE_API_URL,
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;

            if (token) {
                headers.set("x-auth-token", token);
            }

            return headers;
        },
    }),
    tagTypes: ["TASKS", "LOGIN"],
    endpoints: () => ({}),
});
