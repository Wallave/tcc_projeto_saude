import jwt from 'jsonwebtoken';

function verifyToken(req, res, next){
  const myKey = "EssaéAChaveDeCriptoGR@fi@!!";

  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).send({message: "Token não enviado!"});
  }

  const parts = authHeader.split(' ');
  if(parts.length !== 2){
    return res.status(401).send({message: "Token no formato inválido"});
  }

  const [format, token] = parts;
  if(format !== 'Bearer'){
    return res.status(401).send({message: "Token nçao contém 'Bearer'."});
  }

  jwt.verify(token, myKey, (err, decoded) =>{
    if(err){
      return res.status(401).send({message: "Sessão encerrada, usuário não está logado!"});
    }

    req.idUserToken = decoded.id_user;

    return next();
  });
}

export {verifyToken};