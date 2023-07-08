import React from 'react'
import './alterarCad.css';
import Remedio from '../../assets/remedio.png'
import Perfil from '../../assets/perfil.png'
import LogoCruz from '../../assets/simboloCruz.png'
import Buscar from '../../assets/buscar.png'
import Calendario from '../../assets/calendario.png'
import {Link} from 'react-router-dom'
import { IMaskInput } from 'react-imask';
import {useEffect, useState} from 'react';
import api from '../../api';


function AlterarCad() {

  const [cpf, setCpf] = useState('');

  async function handleUpdate(){
    try{
      const dataPaciente = { cpf }

      await api.put('/atualizar',dataPaciente)
    }catch (err){

    }
  }

  const [dados, setDados] = useState('');

  useEffect(() =>{
    const dados = sessionStorage.getItem('dados')
    setDados(dados)
  }, []);

  return (
    <form>
      <div className='tela'>
        <div className='topoInfo'>
          <div className='centro'>
          <h5 className='nomeDados'>{dados}</h5>
          </div>
            <div className='logoRem'>
              <img src={Remedio} className='remedio' id='img-rem'/>
              <h4><Link to="/Cadastro-medicamentos" className='links'>Cadastrar Medicamentos</Link></h4>
              <img src={Perfil} className='remedio' id='img-dados'/>
              <h4>Buscar usuário</h4>
              <img src={Calendario} className='remedio'/>
              <h4><Link to="/agendamentos-posto" className='links'>Agendamentos</Link></h4>
              <img src={LogoCruz} className='logo-cruz'/>
            </div>
          </div>
          <div className='infoDados'>
            <div className='dadosUsuario'>
              <label>CPF :</label>
              <IMaskInput mask="000.000.000.00" type="text"/>
              <button>Pesquisar</button>
            </div>
            <img src={Buscar} className='logoBusca' />
          </div>
        </div>
    </form>
  )
}

export default AlterarCad