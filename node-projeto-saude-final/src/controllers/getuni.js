import db from '../services/getuniService.js';
import express from 'express';



const router = express.Router();


router.post('/', async (req, res) =>{
    const {idMedicamento, qtde, cep} = req.body;

    console.log('chegou', idMedicamento, qtde, cep)
    try{
  
        const results = await db.findUni(idMedicamento, qtde, cep);

        if(results.length == 0){
            res.status(205).end();
        }else{
            res.status(200).json(results);
        }
    }catch(err){
        res.status(500).json({message: `Encontramos um erro: ${err}`})
    }
});

export default router;