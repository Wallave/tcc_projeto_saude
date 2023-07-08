import database from '../repository/connection.js';

async function createAgenda(data, time, qtde, idUnidade, id_usuario, idMedicamento){
    const sql = 'INSERT INTO agendamento(data_retirada, hora, qtde_retirada, id_postofk, id_clientefk, id_medicamentofk) VALUES(?, ?, ?, ?, ?, ?) ';
    
    const dados = [data, time, qtde, idUnidade, id_usuario, idMedicamento];

    const conn = await database.connect();
    conn.query(sql, dados);
    conn.end();
}

export default {createAgenda}