import React from 'react'
import './inicio.css'
import Local from '../../assets/localVerde.png'
import Remedio from '../../assets/remVerde.png'
import Calendario from '../../assets/cadVerde.png'
import {Link} from 'react-router-dom'
function Inicio() {
  return (
    <div id='inicio'>
      <div className='topicos'>
        <div className='topico'>
          <img src={Local} className='icone-img'/>
          <h2>Localizar as unidades mais próximas através do cep.</h2>
        </div>
        <div className='topico'>
          <img src={Remedio} className='icone-img'/>
          <h2>Encontrar os medicamentos disponiveis na unidade selecionada.</h2>
        </div>
        <div className='topico'>
          <img src={Calendario} className='icone-img'/>
          <h2>Agendar data e hora para retirar medicações conforme disponibilidade.</h2>
        </div>
        
      </div>
    </div>
  )
}

export default Inicio