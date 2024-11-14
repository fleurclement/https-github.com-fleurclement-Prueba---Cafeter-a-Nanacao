// routes/jewel.route.js
import { Router } from "express";
import { jewelController } from "../controllers/jewel.controller.js";

const router = Router();

// Ruta para obtener todas las joyas con paginación y ordenamiento
router.get("/", jewelController.getAllJewels);

// Ruta para obtener joyas con filtros específicos
router.get("/filtros", jewelController.getJewelsWithFilters);

export default router;
