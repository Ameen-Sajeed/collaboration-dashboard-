import { Request, Response } from "express";
import * as taskService from "../services/task.service";

let waitingClients: Response[] = [];
let sseClients: Response[] = [];

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

  // long polling 
  // const tasks = await taskService.getTasks();

  // waitingClients.forEach((client) => {
  // client.json(tasks);
  // });

  // waitingClients = [];


  // server side events 

  const tasks = await taskService.getTasks();

    sseClients.forEach((client) => {

    client.write(
        `data: ${JSON.stringify(tasks)}\n\n`
    );

});

  res.status(201).json(task);
};

export const longPollTasks = async (
  _: Request,
  res: Response
) => {
  waitingClients.push(res);

  console.log("Client waiting...");
};

export const sseTasks = (
    req: Request,
    res: Response
  ) => {
  
    res.setHeader("Content-Type", "text/event-stream");
  
    res.setHeader("Cache-Control", "no-cache");
  
    res.setHeader("Connection", "keep-alive");
  
    res.flushHeaders();
  
    sseClients.push(res);
  
    console.log("SSE Client Connected");
  
    req.on("close", () => {
        sseClients = sseClients.filter(client => client !== res);
        console.log("SSE Client Disconnected");
    });
  
  };