import database from '../repository/connection.js';

async function findUni(idMedicamento, qtde, cep){
    const sql = 'SELECT * FROM postos WHERE id_medicamento = ? and qtde >= ? ORDER BY ABS(cep - ?);'

    const valores = [idMedicamento, qtde, cep];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, valores);
    conn.end();

    return rows;
}

export default {findUni}