import { useEffect, useState } from "react";

const API_URL = "http://localhost:5156/api/tasks"; // adapte si besoin

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isCompleted: false }),
    });
    if (res.ok) {
      setTitle("");
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) fetchTasks();
  };

  const toggleTask = async (task) => {
    const res = await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, isCompleted: !task.isCompleted }),
    });
    if (res.ok) fetchTasks();
  };

  const updateTask = async (task) => {
    const res = await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, title: editTitle }),
    });
    if (res.ok) {
      setEditId(null);
      setEditTitle("");
      fetchTasks();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-pink-50 via-white to-violet-100 min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8 drop-shadow-sm">
        💖 Mes Tâches Journalieres
      </h1>

      <form onSubmit={addTask} className="flex gap-3 mb-6">
        <input
          className="flex-1 border border-pink-300 p-3 rounded-full shadow-sm focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
          placeholder="🌸 Ajoute une nouvelle tâche..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-pink-500 text-white px-5 py-2 rounded-full shadow hover:bg-pink-600 transition">
          ➕ Ajouter
        </button>
      </form>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-4 bg-white border border-violet-200 rounded-xl shadow-md"
          >
            {editId === task.id ? (
              <input
                className="flex-1 border border-violet-300 p-2 rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span
                className={`flex-1 cursor-pointer text-lg ${
                  task.isCompleted
                    ? "line-through text-gray-400"
                    : "text-violet-700"
                }`}
                onClick={() => toggleTask(task)}
              >
                {task.title}
              </span>
            )}

            <div className="flex items-center gap-2 ml-2">
              {editId === task.id ? (
                <button
                  className="text-green-500 hover:text-green-600 transition"
                  onClick={() => updateTask(task)}
                >
                  ✅
                </button>
              ) : (
                <button
                  className="text-violet-500 hover:text-violet-700 transition"
                  onClick={() => {
                    setEditId(task.id);
                    setEditTitle(task.title);
                  }}
                >
                  ✏️
                </button>
              )}

              <button
                className="text-pink-400 hover:text-pink-600 transition"
                onClick={() => deleteTask(task.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
