import express from 'express';
import multer from 'multer';
import { login, create} from '../controllers/controllerUsuario.js';

const usuario = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Metdodo Gestion de Usuarios //
usuario.post('/', login); 
usuario.post('/create', upload.single('imagen'), create);
 
export { usuario }