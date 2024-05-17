import express from 'express';
const salaries = express();

import { getSalaries, 
         postSalaries, 
         putSalaries, 
         deleteSalaries } from '../controllers/controllerSalaries.js'; 

// SELECT Salaries 
salaries.get('/', getSalaries);

// CREATE Salaries 
salaries.post('/', postSalaries);

// UPDATE Salaries
salaries.put('/:id', putSalaries);

//DELETE Salaries
salaries.delete('/:id', deleteSalaries );

export {
    salaries
}