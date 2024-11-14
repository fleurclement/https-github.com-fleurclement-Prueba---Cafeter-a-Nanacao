// models/jewel.model.js
import format from "pg-format";
import { pool } from "../database/connection.js";

const findAllJewels = async ({ limit = 5, order_by = "id", page = 1 }) => {
  const offset = (page - 1) * limit;
  const query = format("SELECT * FROM jewels ORDER BY %s LIMIT %s OFFSET %s", order_by, limit, offset);
  const { rows } = await pool.query(query);

  // Total de filas y cálculo de paginación
  const countQuery = "SELECT COUNT(*) FROM jewels";
  const { rows: countResult } = await pool.query(countQuery);
  const total_rows = parseInt(countResult[0].count, 10);
  const total_pages = Math.ceil(total_rows / limit);

  return {
    results: rows,
    total_pages,
    page,
    limit,
    next: total_pages <= page ? null : `/joyas?limit=${limit}&page=${page + 1}`,
    previous: page <= 1 ? null : `/joyas?limit=${limit}&page=${page - 1}`
  };
};

const findJewelsWithFilters = async ({ precio_max, precio_min, categoria, metal }) => {
  let query = "SELECT * FROM jewels WHERE 1=1";
  const values = [];

  if (precio_min) {
    values.push(precio_min);
    query += ` AND precio >= $${values.length}`;
  }
  if (precio_max) {
    values.push(precio_max);
    query += ` AND precio <= $${values.length}`;
  }
  if (categoria) {
    values.push(categoria);
    query += ` AND categoria = $${values.length}`;
  }
  if (metal) {
    values.push(metal);
    query += ` AND metal = $${values.length}`;
  }

  const { rows } = await pool.query(query, values);
  return rows;
};

export const jewelModel = {
  findAllJewels,
  findJewelsWithFilters,
};
