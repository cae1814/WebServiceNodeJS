import express from 'express';
const deptoManagers = express();

import { getDeptoManagers, 
         postDeptoManagers, 
         putDeptoManagers, 
         deleteDeptoManagers } from '../controllers/controllerDeptoManagers.js'; 

// SELECT DeptoManagers 
deptoManagers.get('/', getDeptoManagers);

// CREATE DeptoManagers 
deptoManagers.post('/', postDeptoManagers);

// UPDATE DeptoManagers
deptoManagers.put('/:id', putDeptoManagers);

//DELETE DeptoManagers
deptoManagers.delete('/:id', deleteDeptoManagers );

export {
    deptoManagers
}