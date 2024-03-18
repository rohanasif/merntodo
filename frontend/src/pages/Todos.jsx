import Todo from "../components/Todo";
import { useEffect, useState } from "react";
import { useGetTodosQuery } from "../slice/apiSlice";
import { addTodo, getTodos } from "../slice/todosSlice";
import { useGetCurrentUserQuery, useAddTodoMutation } from "../slice/apiSlice";
import { useDispatch } from "react-redux";

const Todos = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const { data: todosData } = useGetTodosQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [add] = useAddTodoMutation();
  useEffect(() => {
    if (todosData) {
      const reversedTodos = [...todosData].reverse();
      setTodos(reversedTodos);
      dispatch(getTodos(reversedTodos));
    }
  }, [dispatch, todosData]);

  const handleAdd = (e) => {
    e.preventDefault();
    add({ title, completed: false, userId: currentUser._id });
    dispatch(addTodo({ title, completed: false }));
    setTitle("");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {todos && todos.length === 0 && <p>No todos yet!</p>}
      <div className="flex items-center">
        <form
          className="flex items-center gap-3 flex-wrap"
          onSubmit={handleAdd}
        >
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Type something..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={!title.length}
            className="bg-green-700 py-2 px-4 text-white rounded-xl disabled:bg-gray-700"
          >
            Add
          </button>
        </form>
      </div>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => {
          return <Todo key={todo._id} todo={todo} />;
        })}
    </div>
  );
};
export default Todos;
