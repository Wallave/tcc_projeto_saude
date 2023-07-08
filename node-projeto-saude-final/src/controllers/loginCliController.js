import express from 'express';
import db from '../services/loginCliServices.js';
import { generateToken } from '../helpers/loginUni.js';




const router = express.Router();

router.post('/', async (req, res) =>{
  const {email, password} = req.body;

  console.log('testando', email, password)

  try{

    const cliente = await db.login(email, password);

    const id_cliente = cliente[0].id_cliente;
    const nome_cliente = cliente[0].nome;

    console.log(cliente)
    if(cliente.length > 0){
      const token = generateToken(id_cliente,nome_cliente);
      res.status(200).send({message: 'Login efetuado com sucesso', token});
    } else{
      res.status(401).send({message:'Login incorreto'});
    }
  } catch (err){
    res.status(500).send({message:`Houve um erro no banco de dados. ${err}`});
  }
});

export default router;