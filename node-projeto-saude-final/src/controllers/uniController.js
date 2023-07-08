import express from 'express';
import db from '../services/uniService.js';

const routes = express.Router();

routes.post('/', async(req, res)=>{
  const {uniName, endereco, cep, cnpj, responsavel, telefone, email,password} = req.body;

  console.log('uni Controller')

  await db.createUser(uniName, endereco, cep, cnpj, responsavel, telefone, email, password);

  res.status(200).send({message: 'Salvo com sucesso'});
});

export default routes