import { db } from "../db/conexion.js";

const getManagers = async (req, res) => {
    const sql = "SELECT a.id, b.nombres, b.apellidos, TO_CHAR(a.desde, 'DD/MM/YYYY') desde, TO_CHAR(a.hasta, 'DD/MM/YYYY') hasta, a.creado_por, TO_CHAR(a.fecha_creacion, 'DD/MM/YYYY HH24:MI:SS') fecha_creacion FROM ex1_managers a, ex1_employees b WHERE a.id_employee = b.id ORDER BY ID ASC";
    const result = await db.query(sql);

    return res.json(result);
};

const postManagers = async (req, res) => {
    const { id_employee, desde, hasta, } = req.body;
    const data = [id_employee, desde, hasta];

    const sql = 'INSERT INTO ex1_managers (id_employee, desde, hasta) VALUES ($1, $2, $3) returning id';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "INSERT Success", obj_creado: result });
}

const putManagers = async (req, res) => {
    const { id } = req.params;
    const {nombre, apellido} = req.body;
    const data = [nombre, apellido, id];

    const sql = 'UPDATE ex1_managers SET id_employee = $1, desde = $2, hasta = $3 WHERE id = $4 returning id_employee, desde, hasta';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "UPDATE success", obj_creado: result });
}

const deleteManagers = async (req, res) => {
    const { id } = req.params;
    const data = [id];

    const sql = 'DELETE FROM ex1_managers WHERE id = $1 returning id_employee, desde, hasta';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "DELETE success", obj_creado: result });
}

export {
    getManagers,
    postManagers,
    putManagers,
    deleteManagers
}