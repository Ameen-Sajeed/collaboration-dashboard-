import type { Task } from "./task";

export interface CommunicationHook {
  tasks: Task[];
  createTask: (title: string) => Promise<void>;
}