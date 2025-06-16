import { useEffect, useState } from "react";

const Todos = () => {
  const [apiTodos, setApiTodos] = useState([]);
  const [addedTodos, setAddedTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // 1. DummyJSON’dan todos ni yuklab olish
  useEffect(() => {
    fetch("https://dummyjson.com/todos?limit=10")
      .then((res) => res.json())
      .then((data) => {
        const todos = data.todos.map((t) => ({
          title: t.todo,
          description: t.completed ? "✅ Completed" : "❌ Not Completed",
        }));
        setApiTodos(todos);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const handleAddTodo = (newTodo) => {
    setAddedTodos((prev) => [...prev, newTodo]);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (form.title && form.description) {
      handleAddTodo(form);
      setForm({ title: "", description: "" });
      setShowModal(false);
    }
  };

  const allTodos = [...apiTodos, ...addedTodos];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Todo
        </button>
      </div>

      {allTodos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {allTodos.map((todo, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded shadow flex flex-col gap-1"
            >
              <span className="font-semibold">{todo.title}</span>
              <span className="text-sm text-gray-500">{todo.description}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full border border-gray-300 p-2 rounded"
                rows="3"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
