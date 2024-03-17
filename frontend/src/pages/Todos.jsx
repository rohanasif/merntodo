import Todo from "../components/Todo";
import { useEffect, useRef, useState } from "react";
import { useGetTodosQuery } from "../slice/apiSlice";
import { addTodo, getTodos, updateTodo } from "../slice/todosSlice";
import { useGetCurrentUserQuery, useAddTodoMutation } from "../slice/apiSlice";
import { useDispatch } from "react-redux";

const Todos = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [cancelBtn, setCancelBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const { data: todosData } = useGetTodosQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [add] = useAddTodoMutation();
  const inputRef = useRef();

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
        <form onSubmit={handleAdd}>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Type something and press Enter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={inputRef}
          />
        </form>
        {updateBtn && (
          <button
            className="bg-green-700 py-2 px-4 text-white rounded-xl"
            onClick={(e) => handleUpdate(e, todo)}
          >
            Update
          </button>
        )}
        {cancelBtn && (
          <button
            className="bg-red-700 py-2 px-4 text-white rounded-xl"
            onClick={() => {
              setTitle("");
              setUpdateBtn(false);
              setCancelBtn(false);
              setEditBtn(true);
            }}
          >
            Cancel
          </button>
        )}
      </div>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => {
          return (
            <Todo
              key={todo._id}
              todo={todo}
              inputRef={inputRef}
              setTitle={setTitle}
              setUpdateBtn={setUpdateBtn}
              editBtn={editBtn}
              setEditBtn={setEditBtn}
              setCancelBtn={setCancelBtn}
            />
          );
        })}
    </div>
  );
};
export default Todos;
