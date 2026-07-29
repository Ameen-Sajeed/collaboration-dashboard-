import { useEffect, useState } from "react";
import { createTask, getTasks } from "./api/taskApi";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  // short polling 

  useEffect(() => {
    loadTasks();
  
    const interval = setInterval(() => {
      console.log("Polling...");
      loadTasks();
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;

    await createTask(title);

    setTitle("");

    await loadTasks();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🚀 PulseBoard</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <button onClick={handleCreate}>
        Add
      </button>

      <hr />

      {tasks.map((task) => (
        <div key={task.id}>
          {task.title}
        </div>
      ))}
    </div>
  );
}

export default App;