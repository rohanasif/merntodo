import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos: (state, action) => {
      return {
        ...state,
        todos: action.payload,
      };
    },
    addTodo: (state, action) => {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    },
    updateTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          todo.id === action.payload.id
            ? (todo.title = action.payload.title)
            : todo;
        }),
      };
    },
    toggleTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          todo.id === action.payload.id
            ? (todo.completed = !todo.completed)
            : todo;
        }),
      };
    },
    deleteTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    },
  },
});

export const { getTodos, addTodo, updateTodo, toggleTodo, deleteTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
