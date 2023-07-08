import database from '../repository/connection.js';

async function createMedi(cdg_med, qtde, vencimento, data_entrada, idmedicamento, id_posto){
  const sql = 'INSERT INTO tbl_posto_medicamento(cdg_medicamento, qtde, vencimento, data_entrada, id_medicamentoFK, id_postoFK) VALUES (?, ?, ?, ?, ?, ?)';
  const dados = [cdg_med, qtde, vencimento, data_entrada, idmedicamento, id_posto];

  const conn = await database.connect();
  conn.query(sql, dados);
  conn.end();
}

export default {createMedi};