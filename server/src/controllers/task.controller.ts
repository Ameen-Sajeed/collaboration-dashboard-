import { Request, Response } from "express";
import * as taskService from "../services/task.service";

export const getTasks = async (_: Request, res: Response) => {
  const tasks = await taskService.getTasks();

  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
    console.log("here...")
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const task = await taskService.createTask(title);

  res.status(201).json(task);
};