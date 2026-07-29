import { Router } from "express";
import * as taskController from "../controllers/task.controller";

const router = Router();

router.get("/", taskController.getTasks);

router.post("/", taskController.createTask);

router.get("/long-poll", taskController.longPollTasks);

router.get("/events", taskController.sseTasks);

export default router;  