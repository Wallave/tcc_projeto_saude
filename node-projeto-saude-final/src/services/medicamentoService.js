import database from '../repository/connection.js';

async function findMedi(){
    const sql = 'SELECT * from tbl_medicamento';

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end()
    return rows;
}

export default {findMedi}