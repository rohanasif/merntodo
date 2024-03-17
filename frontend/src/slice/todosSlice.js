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
    createTodo: (state, action) => {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    },
    updateTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          todo.id === action.payload.id? 
        }),
      };
    },
    toggleTodo: (state, action) => {},
    deleteTodo: (state, action) => {},
  },
});

export const { getTodos, createTodo, updateTodo, toggleTodo, deleteTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
