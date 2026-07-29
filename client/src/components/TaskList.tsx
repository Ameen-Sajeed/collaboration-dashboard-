import type { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      <hr />

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            {task.title}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;