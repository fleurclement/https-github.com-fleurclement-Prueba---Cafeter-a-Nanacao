// controllers/jewel.controller.js
import { jewelModel } from "../models/jewel.model.js";

const getAllJewels = async (req, res) => {
  const { limit, order_by, page } = req.query;
  try {
    const jewels = await jewelModel.findAllJewels({ limit, order_by, page });
    res.json(jewels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getJewelsWithFilters = async (req, res) => {
  const { precio_max, precio_min, categoria, metal } = req.query;
  try {
    const jewels = await jewelModel.findJewelsWithFilters({ precio_max, precio_min, categoria, metal });
    res.json(jewels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const jewelController = {
  getAllJewels,
  getJewelsWithFilters,
};
