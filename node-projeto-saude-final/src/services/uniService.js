import database from '../repository/connection.js';

async function createUser(uniName, endereco, cep, cnpj, responsavel, telefone, email,password){
  const sql = 'INSERT INTO tbl_posto (nome_unidade, endereco, cep, cnpj, enfermeira, telefone, email,senha) VALUES (?,?,?,?,?,?,?,?)';
  const dados = [uniName, endereco, cep, cnpj, responsavel, telefone, email,password];

  const conn = await database.connect();
  conn.query(sql, dados);
  conn.end();
}

export default {createUser};