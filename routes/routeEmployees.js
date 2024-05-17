import express from 'express';
const employees = express();

import { getEmployees, 
         postEmployees, 
         putEmployees, 
         deleteEmployees } from '../controllers/controllerEmployees.js'; 

// SELECT Employees 
employees.get('/', getEmployees);

// CREATE Employees 
employees.post('/', postEmployees);

// UPDATE Employees
employees.put('/:id', putEmployees);

//DELETE Employees
employees.delete('/:id', deleteEmployees );

export {
    employees
}