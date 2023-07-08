import express from 'express'
import route from '../routes.js';
import db from '../services/cliService.js'


const routes = express.Router();

routes.post('/', async(req, res) => {
  const {cliName, rg, cpf, dt_nascimento, cliEndereco, cliTelefone, n_sus, cliEmail, cliSenha} = req.body

  console.log('uni Controller')

  await db.createUser(cliName, rg, cpf, dt_nascimento, cliEndereco, cliTelefone, n_sus, cliEmail, cliSenha)

  res.status(200).send({messagem: 'Salvo com Sucesso'});
});

routes.get('/:id_user', async(req, res)=>{
  try{
    const {id_user} = req.params;
    const results = await db.updateUser(id_user);

    if(results.length == 0){
      res.status(205).end();
    }else{
      res.status(200).json(results);
    }
  }catch(err){
    res.status(500).json({message: `Encontramos um erro: ${err}`})
  }
});

routes.put('/:id_user', async(req, res) =>{
  const {nome, rg, cpf, dt_nascimento, endereco, tel, sus, email, senha} = req.body
  const {id_user} = req.params;
  const partes = dt_nascimento.split('/')
  const nascimento = `${partes[2]}/${partes[1]}/${partes[0]}`
  console.log(nascimento)
  await db.alterUser(nome, rg, cpf, nascimento, endereco, tel, sus, email, senha, id_user);
  res.status(200).send({message: 'Salvo com sucesso'})

})


export default routes