import express from "express";

import { longTask } from "./long-task";

const app = express();

app.use(express.json());

// Example route handler
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/long-task", (req, res) => {
  console.log("Received request for triggering long-task");
  const uuid = longTask();
  res.json({
    uuid: uuid,
  });
});

// Catch-all route to log paths
app.use((req, res) => {
  res.json({ path: req.path, query: req.query });
});

app.listen(8080, () => {
  console.log("App running on port 8080");
});

export default app;
