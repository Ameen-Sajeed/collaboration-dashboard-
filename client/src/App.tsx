import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { createTask, getTasks } from "./api/taskApi";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types/task";


const socket = io("http://localhost:3001");

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();

    socket.on("task-created", () => {
      loadTasks();
    });

    return () => {
      socket.off("task-created");
    };
  }, []);

  const handleCreateTask = async (title: string) => {
    await createTask(title);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🚀 PulseBoard</h1>

      <TaskForm onCreateTask={handleCreateTask} />

      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;