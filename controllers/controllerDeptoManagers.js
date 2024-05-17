import { db } from "../db/conexion.js";

const getDeptoManagers = async (req, res) => {
    const sql = "SELECT a.id, c.nombre, b.nombres, b.apellidos, TO_CHAR(a.desde, 'DD/MM/YYYY') desde, TO_CHAR(a.hasta, 'DD/MM/YYYY') hasta, a.creado_por, TO_CHAR(a.fecha_creacion, 'DD/MM/YYYY HH24:MI:SS') fecha_creacion FROM ex1_depto_manager a, ex1_employees b, ex1_departments c WHERE a.id_employee = b.id AND a.id_departments = c.id ORDER BY id ASC";
    const result = await db.query(sql);
    return res.json(result);
};

const postDeptoManagers = async (req, res) => {
    const { id_employee, id_departments, desde, hasta, } = req.body;
    const data = [id_employee, id_departments, desde, hasta];
    const sql = 'INSERT INTO ex1_depto_manager (id_employee, id_departments, desde, hasta) VALUES ($1, $2, $3, $4) returning id';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "INSERT Success", obj_creado: result });
}

const putDeptoManagers = async (req, res) => {
    const { id } = req.params;
    const {nombre, apellido} = req.body;
    const data = [nombre, apellido, id];

    const sql = 'UPDATE ex1_depto_manager SET id_employee = $1, id_departments = $2, desde = $3, hasta = $4 WHERE id = $5 returning id_employee, id_departments, desde, hasta';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "UPDATE success", obj_creado: result });
}

const deleteDeptoManagers = async (req, res) => {
    const { id } = req.params;
    const data = [id];

    const sql = 'DELETE FROM ex1_depto_manager WHERE id = $1 returning id_employee, id_departments, nombre, desde, hasta';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "DELETE success", obj_creado: result });
}

export {
    getDeptoManagers,
    postDeptoManagers,
    putDeptoManagers,
    deleteDeptoManagers
}