import express from 'express';
const managers = express();

import { getManagers, 
         postManagers, 
         putManagers, 
         deleteManagers } from '../controllers/controllerManagers.js'; 

// SELECT Managers 
managers.get('/', getManagers);

// CREATE Managers 
managers.post('/', postManagers);

// UPDATE Managers
managers.put('/:id', putManagers);

//DELETE Managers
managers.delete('/:id', deleteManagers );

export {
    managers
}