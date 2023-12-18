import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    // add tags to stop weird caching and no updates
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "/todos",
            // to have the latest up the top
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ["Todos"]
        }),
        // mutation means your changing the data
        addTodo: builder.mutation({
            query:(todo) => ({
                url: "/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: "PATCH",
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["Todos"]
        }),
    })
})

// will always start with use and end with Query/Mutation (whatever the . was) and the method name in between
// this is a custom hook
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice