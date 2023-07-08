import database from '../repository/connection.js';

async function createUser(cliName, rg, cpf, dt_nascimento, cliEndereco, cliTelefone, n_sus, cliEmail, cliSenha){
  const sql = 'INSERT INTO tbl_cliente(nome, rg, cpf, dt_nascimento, endereco, telefone,n_sus, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const dados = [cliName, rg, cpf, dt_nascimento, cliEndereco, cliTelefone, n_sus, cliEmail, cliSenha];

  const conn = await database.connect();
  conn.query(sql, dados)
  conn.end();
}


async function updateUser(id_user){
  const sql = 'SELECT * FROM tbl_cliente WHERE id_cliente = ?'
  const conn = await database.connect();
  const [rows] = await conn.query(sql, id_user);
  conn.end();
  return rows;
  
}

async function alterUser(nome, rg, cpf, dt_nascimento, endereco, tel, sus, email, senha, id_user){
  const sql = 'UPDATE  tbl_cliente SET nome = ?, rg = ?, cpf = ?, dt_nascimento = ?, endereco = ?, telefone = ?, n_sus = ?, email = ?, senha = ? WHERE id_cliente = ? '

  const dados = [nome, rg, cpf, dt_nascimento, endereco, tel, sus, email, senha, id_user];
  const conn = await database.connect();
  conn.query(sql, dados)
  conn.end();
}

export default {createUser, updateUser, alterUser};