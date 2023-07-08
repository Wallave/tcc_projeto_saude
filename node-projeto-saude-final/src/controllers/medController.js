import express from 'express'

import db from '../services/medService.js'

const routes = express.Router();

routes.post('/', async(req, res) => {
  const {cdg_med, qtde, vencimento, data_entrada, idmedicamento, id_posto} = req.body

  console.log('med Controller')

  await db.createMedi(cdg_med, qtde, vencimento, data_entrada, idmedicamento, id_posto)

  res.status(200).send({messagem: 'Medicameno salvo com sucesso'});
} );

export default routes