import database from '../repository/connection.js';

async function login(email, password){
  const sql = 'SELECT * FROM tbl_posto where email=? AND senha=?'
  const dataLogin = [email, password];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dataLogin);
  conn.end();

  return rows;
}


async function checkEmail (email){
  const sql = 'SELECT * FROM tbl_posto WHERE email = ?';
  
  const conn = await database.connect();
  const [rows] = await conn.query(sql, email);
  conn.end();
  return rows
}
export default {login, checkEmail}