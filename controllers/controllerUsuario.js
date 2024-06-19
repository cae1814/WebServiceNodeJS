import { db } from "../db/conexion.js";
import jwt from 'jsonwebtoken';
import {configDotenv} from 'dotenv';
import bcrypt from 'bcrypt';

configDotenv();
const saltRounds = 10;

const login = async (req, res) => {
    console.log("Login");

    const app_token_vigency = process.env.app_token_vigency;

    try {
        const { usuario, contrasena } = req.body;
        const sql = `SELECT id, usuario, contrasena, nombre_completo, CASE WHEN estado = 1 THEN 'Activo' ELSE 'Inactivo' END estado, TO_CHAR(fecha_creacion, 'DD/MM/YYYY HH24:MI:SS') fecha_creacion
                       FROM ex_usuarios
                      WHERE usuario         = $1
                        AND estado 	        = 1`;
        
        const result = await db.query(sql, [usuario]);
        const passwordMatch = await bcrypt.compare(req.body.contrasena, result[0].contrasena);

        if (!passwordMatch) {
            //console.log('Invalid credentials');
            res.status(200).json({ response_code: 901, mensaje: "Authentication failed" });
        } else {
            //console.log('Login successful');
            const payload = result[0]; 
            const token = jwt.sign ( payload, 'appsecret', { expiresIn: app_token_vigency*60*60}  );
            res.status(200).json({response_code: 0,  user_id: result, mensaje: "Success", info_user: token });
        }
    } catch (err) {
        res.status(200).json({ response_code: 902, mensaje: "Internal server error", err: err.message });
    }
}

const create = async (req, res) => {
    console.log("Creando...");
    const saltRounds = 10;
    const passwhash = await bcrypt.hash(req.body.contrasena, saltRounds);
    
    try {
        
        const { usuario, nombre_completo, correo} = req.body;
        const { buffer, originalname, mimetype } = req.file;
        
        const sql = `INSERT INTO ex_usuarios (usuario, nombre_completo, correo, contrasena, foto, nombre_foto, mime_type)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * `;
        
        const result = await db.query(sql, [usuario, nombre_completo, correo, passwhash, buffer, originalname, mimetype]);
        res.status(200).json({ response_code: 0, message: "Success", obj_creado: result });
    } catch (err) { 
        console.log(err.message)
        res.status(200).json({ response_code: -1, message: `Error al ejecutar el SQL`, err: err.message })
    }
}

export {
    login, 
    create
}