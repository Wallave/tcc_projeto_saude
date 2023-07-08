import React, {useState, useEffect} from 'react'
import './agendados.css'
import Calendario from '../../assets/calendario.png'
import Perfil from '../../assets/perfil.png'
import {Link} from 'react-router-dom'
import api from '../../api'
import moment from 'moment'
import 'moment/locale/pt-br'


function Agendados() {

  




  const [agendados, setAgendados] =useState([]);
  const [dados, setDados] = useState('');

  useEffect(()=>{
    const dados = sessionStorage.getItem('dadosId')
    setDados(dados);
    console.log(agendados)
    async function getAgenda(){
      const {data} = await api.get(`/agendados/teste/${dados}`);
      setAgendados(data);
    }
    getAgenda();
  }, []);





  return (
    <div className='div-pai'>
      <div className='info-uni'>
        <div>
          <img src={Perfil} className='img-cale'/>
          <h3><Link to="/dados-usuario" className='link-dados'>Dados</Link></h3>
        </div>
        <div>
          <img src={Calendario} className='img-cale'/>
          <h3><Link to="/medicamento" className='link-dados' >Agendar</Link></h3>
        </div>
      </div>
      {agendados.length > 0 && <>
        <div className="agendamentos">
        {
          agendados.map((item) =>(
                <div className="card">
                Unidade: <h2>{item.nome_unidade}</h2>
                Medicamento: <p>{item.medicamento}</p>
                Quantidade: <p>{item.qtde_retirada}</p>
                Data de retirada: <p>{moment(item.data_retirada).format('L')}</p>
                Hora: <p>{item.hora}</p>
                </div>
          ))
        }
        </div>
      </>}
      {agendados.length == 0 &&
        <div className='agendados'>
          <h4>Não foram encontrados agendamentos para o usuário cadastrado.</h4>
        </div>
      }
    </div>
  )
}

export default Agendados