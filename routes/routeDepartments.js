import express from 'express';
const departments = express();
import {
    getDepartments,
    postDepartments,
    putDepartments,
    deleteDepartments
} from '../controllers/controllerDepartments.js';

// SELECT Departments
departments.get('/', getDepartments); 

// INSERT Departments
departments.post('/', postDepartments)

// UPDATE Departments
departments.put('/:id', putDepartments)

// DELETE Departments
departments.delete('/:id', deleteDepartments);

export {
    departments
}