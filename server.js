import express from 'express';
import cors from 'cors';
const app = express();
import { employees } from './routes/routeEmployees.js';
import { departments } from './routes/routeDepartments.js';
import { managers } from './routes/routeManagers.js';
import { salaries } from './routes/routeSalaries.js';
import { titles } from './routes/routeTitles.js';
import { deptoManagers } from './routes/routeDeptoManagers.js';

// MiddleWare

app.use(cors());
app.use(express.json());

app.use('/employees', employees, cors());
app.use('/departments', departments, cors());
app.use('/managers', managers, cors());
app.use('/salaries', salaries, cors());
app.use('/titles', titles, cors());
app.use('/deptoManagers', deptoManagers, cors());

app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000");
});