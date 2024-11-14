// index.js
import cors from "cors";
import "dotenv/config";
import express from "express";

import todoRoute from "./routes/todo.route.js";
import jewelRoute from "./routes/jewel.route.js";
import logRequest from "./middlewares/logger.js";

const app = express();

app.use(express.json());
app.use(cors());

// Rutas para la API de todos
app.use("/todos", todoRoute);

// Rutas para la API de joyas
app.use("/joyas", jewelRoute);

// Aplica el middleware para registrar todas las solicitudes a /joyas
app.use("/joyas", logRequest, jewelRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
