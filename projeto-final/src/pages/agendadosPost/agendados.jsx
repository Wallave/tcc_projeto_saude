import React, {useEffect, useState} from 'react'
import './agendados.css'
import Calendario from '../../assets/calendario.png'
import Perfil from '../../assets/perfil.png'
import Remedio from '../../assets/remedio.png'
import {Link} from 'react-router-dom'
import api from '../../api.js'
import moment from 'moment'
import 'moment/locale/pt-br'
function Agendados() {

  const [agendados, setAgendados] = useState([]);
  const [dados, setDados] = useState('');

  useEffect(() =>{
    const dados = sessionStorage.getItem('dadosid')
    setDados(dados);
    async function getAgenda(){
      const {data} = await api.get(`/agendados/${dados}`);
      setAgendados(data);

    }
    getAgenda();
  }, []);

  return (
    <div className='div-pai'>
      <div className='info-unidade'>
        
        <div>
          <img src={Calendario} className='img-cale'/>
          <h3 className='linkunidade'>Agendamentos</h3>
        </div>
        <div>
          <img src={Remedio} className='img-cale'/>
          <h3><Link to="/Cadastro-medicamentos" className='linkunidade' >Cadastrar Medicamentos</Link></h3>
        </div>
      </div>
      <div className='agendados'>
        {agendados.length > 0 && <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>SUS</th>
              <th>Rémedio</th>
              <th>Quantidade</th>
              <th>Data de Retirada</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {
              agendados.map((item)=>(
                <tr>
                  <td>{item.nome}</td>
                  <td>{item.sus}</td>
                  <td>{item.medicamento}</td>
                  <td>{item.qtde_retirada}</td>
                  <td>{moment(item.data_retirada).format('L')}</td>
                  <td>{item.hora}</td>
                </tr>
              ))
            }
          </tbody>
        </table> }
        {agendados == 0 && <h4>Nenhuma agendamento foi marcado</h4>}
      </div>
    </div>
  )
}

export default Agendados