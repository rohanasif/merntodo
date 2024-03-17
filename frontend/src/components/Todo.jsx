import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleTodo, updateTodo, deleteTodo } from "../slice/todosSlice";
import {
  useToggleTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../slice/apiSlice";

const Todo = ({
  todo,
  inputRef,
  setTitle,
  setUpdateBtn,
  editBtn,
  setEditBtn,
  setCancelBtn,
}) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [toggle, toggleResponse] = useToggleTodoMutation();
  const [update, updateResponse] = useUpdateTodoMutation();
  const [del] = useDeleteTodoMutation();

  const dispatch = useDispatch();

  console.log(toggleResponse);

  const handleEdit = () => {
    inputRef.current.focus();
    setTitle(todo.title);
    setEditBtn(false);
    setUpdateBtn(true);
    setCancelBtn(true);
  };

  const handleUpdate = (e, todo) => {
    console.log(todo);
    setUpdateBtn(false);
    setCancelBtn(false);
    setEditBtn(true);
    update({ ...todo, title: todo.title });
    dispatch(updateTodo({ ...todo, title: todo.title }));
  };

  const handleToggle = () => {
    setCompleted(!completed);
    toggle(todo);
    dispatch(toggleTodo(todo));
  };

  return (
    <form className="flex items-center gap-4">
      <input
        type="checkbox"
        name="complete"
        id={`complete-${todo._id}`}
        checked={completed}
        onChange={handleToggle}
      />
      <h3 className={completed ? "line-through" : null}>{todo.title}</h3>
      {editBtn && (
        <button
          className="bg-blue-700 py-2 px-4 text-white rounded-xl"
          onClick={handleEdit}
        >
          Edit
        </button>
      )}
      <button
        className="bg-red-700 py-2 px-4 text-white rounded-xl"
        onClick={() => {
          del(todo._id);
          dispatch(deleteTodo(todo._id));
        }}
      >
        Delete
      </button>
    </form>
  );
};

export default Todo;
