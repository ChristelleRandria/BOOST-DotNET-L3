export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between p-2 border rounded">
          <span
            className={`flex-1 cursor-pointer ${task.isCompleted ? "line-through text-gray-500" : ""}`}
            onClick={() => onToggle(task)}
          >
            {task.title}
          </span>
          <button onClick={() => onDelete(task.id)} className="text-red-500">🗑️</button>
        </li>
      ))}
    </ul>
  );
}
