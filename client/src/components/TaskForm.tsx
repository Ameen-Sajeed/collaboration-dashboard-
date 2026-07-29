import { useState } from "react";

interface TaskFormProps {
  onCreateTask: (title: string) => Promise<void>;
}

function TaskForm({ onCreateTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await onCreateTask(title);

    setTitle("");
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <button onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default TaskForm;