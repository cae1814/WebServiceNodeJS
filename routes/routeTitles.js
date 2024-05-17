import express from 'express';
const titles = express();

import { getTitles, 
         postTitles, 
         putTitles, 
         deleteTitles } from '../controllers/controllerTitles.js'; 

// SELECT Salaries 
titles.get('/', getTitles);

// CREATE Salaries 
titles.post('/', postTitles);

// UPDATE Salaries
titles.put('/:id', putTitles);

//DELETE Titles
titles.delete('/:id', deleteTitles );

export {
    titles
}