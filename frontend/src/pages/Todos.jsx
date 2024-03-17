import Todo from "../components/Todo";
import { useEffect, useState } from "react";
import { useGetTodosQuery } from "../slice/apiSlice";
import { addTodo, getTodos } from "../slice/todosSlice";
import { useGetCurrentUserQuery, useAddTodoMutation } from "../slice/apiSlice";
import { useDispatch } from "react-redux";
const Todos = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const { data: todosData } = useGetTodosQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const dispatch = useDispatch();
  const [add] = useAddTodoMutation();

  useEffect(() => {
    setTodos(todosData);
    dispatch(getTodos(todosData));
  }, [dispatch, todosData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    add({ title, completed: false, userId: currentUser._id });
    dispatch(addTodo({ title, completed: false }));
    setTitle("");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {todos && todos.length === 0 && <p>No todos yet!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Type something and press Enter"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => {
          return <Todo key={todo._id} todo={todo} />;
        })}
    </div>
  );
};
export default Todos;
