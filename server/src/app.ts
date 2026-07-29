import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "PulseBoard API Running!",
  });
});

app.use("/tasks", taskRoutes);

export default app;