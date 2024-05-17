import { db } from "../db/conexion.js";

const getTitles = async (req, res) => {
    const sql = "SELECT a.id, a.nombre, b.nombres, b.apellidos, TO_CHAR(a.desde, 'DD/MM/YYYY') desde, TO_CHAR(a.hasta, 'DD/MM/YYYY') hasta, a.creado_por, TO_CHAR(a.fecha_creacion, 'DD/MM/YYYY HH24:MI:SS') fecha_creacion FROM ex1_titles a, ex1_employees b WHERE a.id_employee = b.id ORDER BY id ASC ";
    const result = await db.query(sql);

    return res.json(result);
};

const postTitles = async (req, res) => {
    const { id_employee, nombre, desde, hasta, } = req.body;
    const data = [id_employee, nombre, desde, hasta];

    const sql = 'INSERT INTO ex1_titles (id_employee, nombre, desde, hasta) VALUES ($1, $2, $3, $4) returning id';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "INSERT Success", obj_creado: result });
}

const putTitles = async (req, res) => {
    const { id } = req.params;
    const {nombre, apellido} = req.body;
    const data = [nombre, apellido, id];

    const sql = 'UPDATE ex1_titles SET id_employee = $1, nombre = $2, desde = $3, hasta = $4 WHERE id = $5 returning id_employee, desde, hasta';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "UPDATE success", obj_creado: result });
}

const deleteTitles = async (req, res) => {
    const { id } = req.params;
    const data = [id];

    const sql = 'DELETE FROM ex1_titles WHERE id = $1 returning id_employee, nombre, desde, hasta';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "DELETE success", obj_creado: result });
}

export {
    getTitles,
    postTitles,
    putTitles,
    deleteTitles
}