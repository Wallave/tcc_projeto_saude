import database from '../repository/connection.js';

async function findAgenda(id_posto){
  const sql = 'SELECT * FROM agendados WHERE id_posto = ?';

  const conn = await database.connect();
  const [rows] = await conn.query(sql, id_posto);
  conn.end()
  return rows;

}

async function finDAgenda(id_posto){
  const sql = 'SELECT * FROM agendados WHERE id_cliente = ?';

  const conn = await database.connect();
  const [rows] = await conn.query(sql, id_posto);
  conn.end()
  return rows;

}

export default {findAgenda, finDAgenda}