import { db } from "../db/conexion.js";

const getSalaries = async (req, res) => {
    console.log("getSalaries");
    const sql = "SELECT a.id, b.nombres, b.apellidos, TO_CHAR(a.desde, 'DD/MM/YYYY') desde, TO_CHAR(a.hasta, 'DD/MM/YYYY') hasta, salario, a.creado_por, TO_CHAR(a.fecha_creacion, 'DD/MM/YYYY HH24:MI:SS') fecha_creacion FROM ex1_salaries a, ex1_employees b WHERE a.id_employee = b.id ORDER BY id ASC ";
    const result = await db.query(sql);
    return res.json(result);
};

const postSalaries = async (req, res) => {
    const { id_employee, desde, hasta, salario} = req.body;
    const data = [id_employee, desde, hasta, salario];

    const sql = 'INSERT INTO ex1_salaries (id_employee, desde, hasta, salario) VALUES ($1, $2, $3, $4) returning id';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "INSERT Success", obj_creado: result });
}

const putSalaries = async (req, res) => {
    const { id } = req.params;
    const {nombre, apellido} = req.body;
    const data = [nombre, apellido, id];

    const sql = 'UPDATE ex1_salaries SET id_employee = $1, desde = $2, hasta = $3, salario = $4 WHERE id = $5 returning id_employee, desde, hasta';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "UPDATE success", obj_creado: result });
}

const deleteSalaries = async (req, res) => {
    const { id } = req.params;
    const data = [id];

    const sql = 'DELETE FROM ex1_salaries WHERE id = $1 returning id_employee, desde, hasta, salario';
    const result = await db.query(sql, data);

    return res.json({ mensaje: "DELETE success", obj_creado: result });
}

export {
    getSalaries,
    postSalaries,
    putSalaries,
    deleteSalaries
}