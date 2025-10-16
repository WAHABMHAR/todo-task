import { baseApi } from "../baseApi";

export const taskApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        gatAllTasks: builder.query({
            query: () => ({
                url: "tasks",
                method: "GET",
            }),
            transformResponse: (response) => response.data,
            providesTags: ["TASKS"],
        }),
        gatTask: builder.query({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "GET",
            }),
            transformResponse: (response) => response.data,
            providesTags: ["TASKS"],
        }),
        createTask: builder.mutation({
            query: (credentials) => {
                if (credentials?.id) {
                    return {
                        url: `tasks/${credentials.id}`,
                        method: "PUT",
                        body: credentials,
                    };
                }

                return {
                    url: "tasks",
                    method: "POST",
                    body: credentials,
                };
            },
            invalidatesTags: ["TASKS"],
        }),
        updateStatus: builder.mutation({
            query: (credentials) => {
                return {
                    url: "tasks",
                    method: "PATCH",
                    body: credentials,
                };
            },
            invalidatesTags: ["TASKS"],
        }),
        deleteTask: builder.mutation({
            query: (id) => {
                return {
                    url: `tasks/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["TASKS"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGatAllTasksQuery,
    useGatTaskQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateStatusMutation,
} = taskApis;
