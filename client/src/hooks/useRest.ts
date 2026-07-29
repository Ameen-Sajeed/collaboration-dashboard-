import { useEffect, useState } from "react";
import { createTask, getTasks } from "../api/taskApi";
import type { Task } from "../types/task";

export function useRest() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (title: string) => {
    await createTask(title);
    await loadTasks();
  };

  return {
    tasks,
    createTask: handleCreateTask,
  };
}