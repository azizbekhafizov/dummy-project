import { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // GET todos
  useEffect(() => {
    if (user) {
      axios
        .get(`https://dummyjson.com/todos/user/${user.id}`)
        .then((res) => {
          setTodos(res.data.todos);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading todos", err);
          setLoading(false);
        });
    }
  }, [user]);

  // POST new todo
  const handleAdd = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await axios.post("https://dummyjson.com/todos/add", {
        todo: newTodo,
        completed: false,
        userId: user.id,
      });

      setTodos((prev) => [res.data, ...prev]);
      setNewTodo("");
    } catch (err) {
      console.error("Add todo error", err);
    }
  };

  // DELETE todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete todo error", err);
    }
  };

  // PATCH toggle completed
  const toggleComplete = async (todo) => {
    try {
      const res = await axios.put(`https://dummyjson.com/todos/${todo.id}`, {
        completed: !todo.completed,
      });

      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, completed: res.data.completed } : t))
      );
    } catch (err) {
      console.error("Toggle error", err);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "completed"
      ? todo.completed
      : filter === "pending"
      ? !todo.completed
      : true
  );

  if (!user) {
    return <p className="text-center mt-10 text-red-600">Please login to view your todos.</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading todos...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Todos</h2>

      {/* Add todo input */}
      <div className="flex gap-2 mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        {["all", "completed", "pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded border ${
              filter === type ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <ul className="space-y-3">
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500">No todos found.</p>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 border rounded ${
                todo.completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.todo}
                </span>
              </div>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todos;
