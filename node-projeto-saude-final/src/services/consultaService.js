import database from '../repository/connection.js';

async function consultaMed(letras){
    const sql = `SELECT * from tbl_posto_medicamento where nome_medicamento LIKE '${letras}%'`;

    const conn = await database.connect();
    const [rows] = await conn.query(sql, letras);
    conn.end()
    return rows
};

export default {consultaMed}