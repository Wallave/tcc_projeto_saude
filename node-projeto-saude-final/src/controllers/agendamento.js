import express from 'express';

import db from '../services/agendamentoService.js';

const routes = express.Router();

routes.post('/', async(req, res) => {

    try{
    const {data, time, qtde, idUnidade, id_usuario , idMedicamento} = req.body

    await db.createAgenda(data, time, qtde, idUnidade, id_usuario , idMedicamento)

    res.status(200).send({message: `O agendamento foi realizado com sucesso`});
    }catch(err){
        res.status(500).send({message: `Ocorrou um erro ${err}`})
    }
});

export default routes