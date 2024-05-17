import { db } from "../db/conexion.js";

const getEmployees = async (req, res) => {
    const sql = "SELECT id, nombres, apellidos, dni, TO_CHAR(fecha_nacimiento, 'DD/MM/YYYY') fecha_nacimiento, genero, CASE estado WHEN 0 THEN 'Activo' WHEN 1 THEN 'Suspendido' ELSE 'Desactivo' END estado FROM ex1_employees ORDER BY ID ASC";
    const result = await db.query(sql);

    return res.json(result);
};

const postEmployees = async (req, res) => {
    const { nombres, apellidos, dni, fecha_nacimiento, genero } = req.body;
    const data = [nombres, apellidos, dni, fecha_nacimiento, genero];
    const sql = 'INSERT INTO ex1_employees (nombres, apellidos, dni, fecha_nacimiento, genero) VALUES ($1, $2, $3, $4, $5) returning id';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "INSERT Success", obj_creado: result });
}

const putEmployees = async (req, res) => {
    const { id } = req.params;
    const {nombres, apellidos, dni, fecha_nacimiento, genero} = req.body;
    const data = [nombres, apellidos, dni, fecha_nacimiento, genero, id];

    const sql = 'UPDATE ex1_employees SET nombres = $1, apellidos = $2, dni = $3, fecha_nacimiento = $4, genero = $5  WHERE id = $6 returning id, nombres, apellidos, dni, fecha_nacimiento, genero';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "UPDATE success", obj_creado: result });
}

const deleteEmployees = async (req, res) => {
    const { id } = req.params;
    const data = [id];

    const sql = 'DELETE FROM ex1_employees WHERE id = $1 returning id, nombres, apellidos, dni, fecha_nacimiento, genero';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "DELETE success", obj_creado: result });
}

export {
    getEmployees,
    postEmployees,
    putEmployees,
    deleteEmployees
}