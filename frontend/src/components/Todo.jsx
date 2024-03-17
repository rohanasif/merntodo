import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../slice/todosSlice";
import {
  useToggleTodoMutation,
  useDeleteTodoMutation,
} from "../slice/apiSlice";
const Todo = ({ todo }) => {
  const [completed, setCompleted] = useState(false);
  const [toggle, toggleResponse] = useToggleTodoMutation();
  const [del, delResponse] = useDeleteTodoMutation();
  const dispatch = useDispatch();
  console.log(toggleResponse);
  return (
    <div key={todo._id} className="flex items-center gap-4">
      <input
        type="checkbox"
        name="complete"
        id={`complete-${todo._id}`}
        checked={completed}
        onChange={() => {
          setCompleted(!completed);
          toggle(todo._id);
          dispatch(toggleTodo(todo._id));
        }}
      />
      <h3 className={completed ? "line-through" : null}>{todo.title}</h3>
      <button
        className="bg-blue-700 py-2 px-4 text-white rounded-xl"
        onClick={() => {}}
      >
        Edit
      </button>
      <button
        className="bg-red-700 py-2 px-4 text-white rounded-xl"
        onClick={() => {
          console.log(todo._id);
          del(todo._id);
          dispatch(deleteTodo(todo._id));
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default Todo;
