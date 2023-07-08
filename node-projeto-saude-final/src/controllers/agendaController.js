import express, { response } from 'express';
import db from '../services/agendaService.js';

const router = express.Router();

router.get('/:id_posto', async (req, res) =>{
  try{
    const {id_posto} = req.params;
    const results = await db.findAgenda(id_posto);

    if(results.length == 0){
      res.status(205).end();
    }else{
      res.status(200).json(results);
    }
  }catch(err){
    res.status(500).json({message: `Encontramos um erro: ${err}`});
  }
});

router.get('/teste/:id_posto', async (req, res) =>{
  try{
    const {id_posto} = req.params;
    const results = await db.finDAgenda(id_posto);

    if(results.length == 0){
      res.status(205).end();
    }else{
      res.status(200).json(results);
    }
  }catch(err){
    res.status(500).json({message: `Encontramos um erro: ${err}`});
  }
});


export default router;