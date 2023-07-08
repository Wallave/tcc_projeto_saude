import db from '../services/medicamentoService.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) =>{
    
    try{
        const results = await db.findMedi();

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