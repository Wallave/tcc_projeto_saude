import express from 'express';
import { generateToken } from '../helpers/loginUni.js';
import db from '../services/loginUniServices.js';





const router = express.Router();

router.post('/', async (req, res) =>{
  const {email, password} = req.body;
  
  console.log('testando', email, password)
  try{

    const unidade = await db.login(email, password);

    const id_posto = unidade[0].id_posto;
    const name = unidade[0].nome_unidade;
    const endereco = unidade[0].endereco;
    const cep = unidade[0].cep;
    const email_posto = unidade[0].email;


    console.log(unidade)
    if(unidade.length > 0){
      const token = generateToken(id_posto, name, endereco, cep, email_posto);
      res.status(200).send({message: 'Login efetuado com sucesso', token});
    } else{
      res.status(401).send({message: 'Login incorreto'});
    }
  } catch(err){
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
  }
});

export default router;