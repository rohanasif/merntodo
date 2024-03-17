import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["currentUser", "todos"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["currentUser"],
    }),
    signUp: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["todos", "currentUser"],
    }),
    signIn: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["todos", "currentUser"],
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["currentUser", "todos"],
    }),
    getTodos: builder.query({
      query: () => ({
        url: "/todos",
        method: "GET",
      }),
      providesTags: ["todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo._id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["todos"],
    }),
    toggleTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo._id}`,
        method: "PATCH",
        body: { title: todo.title, completed: todo.completed },
      }),
      invalidatesTags: ["todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} = api;
