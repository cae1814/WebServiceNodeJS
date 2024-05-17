import { db } from "../db/conexion.js";

const getDepartments = async (req, res) => {
    
    const {id} = req.params;
    var sql = "SELECT id, nombre, descripcion, creado_por, TO_CHAR(fecha_creacion, 'DD/MM/YYYY HH24:MI:SS') fecha_creacion FROM ex1_departments ORDER BY ID ASC";
    const result = await db.query(sql);
    
    return res.json(result);
}

const postDepartments = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const data = [nombre, descripcion];

    const sql = 'INSERT INTO ex1_departments (nombre, descripcion) VALUES ($1, $2) returning id, nombre, descripcion';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "INSERT Success", obj_creado: result });
}

const putDepartments = async (req, res) => {
    const { id } = req.params;
    const {numero_telefono} = req.body;
    const data = [numero_telefono, id];

    const sql = 'UPDATE ex1_departments SET nombre = $1, descripcion = $2 WHERE id = $3 returning id, nombre, descripcion';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "UPDATE success", obj_creado: result });    
}

const deleteDepartments = async (req, res) => {
    const { id } = req.params;
    const data = [id];
    
    const sql = 'DELETE FROM ex1_departments WHERE id = $1 returning id, nombre, descripcion';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "DELETE success", obj_creado: result });
}

export {
    getDepartments,
    postDepartments,
    putDepartments,
    deleteDepartments
}