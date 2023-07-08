import jwt from 'jsonwebtoken';

function generateToken(id_posto, name, endereco, cep, email_posto){

  const myKey = "EssaéAChaveDeCriptoGR@fi@!!";
  const token = jwt.sign(
    {id_posto, name, endereco, cep, email_posto},
    myKey,
    {expiresIn: 600 * 600}
  )
  return token;
}

export {generateToken};