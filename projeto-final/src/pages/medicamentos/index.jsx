import React from 'react'
import './script.css'
import {Link} from 'react-router-dom'
import Med from '../../assets/localizarUni.png'
import Perfil from '../../assets/perfil.png'
import Calendario from '../../assets/calendario.png'
import api from '../../api';
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify'
import {IMaskInput} from 'react-imask'

function Medicamentos() {

  const [dados, setDados] = useState('');
  const [medicamentos, setMedicamentos] = useState([])
  const [valores, setValores] = useState([]);
  const [saude, setSaude] = useState([]);
  const [nome, setNome] = useState(null);
  const [idMedicamento, setIdMedicamento] = useState(null);
  const [cep, setCep] = useState(null);
  const [qtde, setQtde] = useState (null);
  const [nomeUni, setNomeUni] = useState(null);
  const [idUnidade, setIdUnidade] = useState(null);
  const [data, setData] = useState('');
  const [time, setTime] = useState('');
  const [idUsuario, setIdUsuario] = useState(null)
  useEffect(() =>{
    const dados = sessionStorage.getItem('dados')
    const idUsuario = sessionStorage.getItem('dadosId')
    setIdUsuario(idUsuario)
    setDados(dados)

    async function getMedi(){
      const {data} = await api.get('/medicamentos');
      setMedicamentos(data);
      console.log(data);
      
    }
    getMedi();
  }, []);

  function alerta(){
    toast.warning(`Estão faltando espaços a serem preenchidos`, {
      position: "top-center",
      style: {width: '400px'},
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  }

  function getNome(e){
    setNome(e.target.value);
    const nomes = e.target.value;
    setValores(medicamentos.filter(item => item.nome_medicamento.toUpperCase().includes(nomes.toUpperCase())))
  }
  
  async function handleAgenda(e){
    e.preventDefault();
    
    try{
      const dados = {
        data, time, qtde, idUnidade, id_usuario: idUsuario, idMedicamento
      };
      const response = await api.post('/agendamento', dados);
      console.log(response)

      toast.success(`O agendamento foi realizado com sucesso`, {
        position: "top-center",
        style: {width: '400px'},
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    setNome('');
    setCep('');
    setQtde('');
    setNomeUni('');
    setData('');
    setTime('');
    }catch(err){
      toast.error(`Houve um erro no cadastro do medicamento ${err}`, {
        position: "top-center",
        style: {width: '400px'},
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    }
  }

  async function getUniSaude(e){
    e.preventDefault();
    console.log("nome", nome)
    console.log("cep", cep)
    console.log("qtde", qtde)
    if(!nome || !cep || !qtde ){
      toast.warning(`Estão faltando espaços a serem preenchidos`, {
        position: "top-center",
        style: {width: '400px'},
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    }else{
    try{
      const data = {
        idMedicamento, qtde, cep
      };
      const response = await api.post('/getUnidade', data);
      setSaude(response.data)
      if(response.data.length == 0){
        toast.warning(`A quantidade de rémedios é maior que as registradas`, {
          position: "top-center",
          style: {width: '400px'},
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      }
      console.log(response.data.qtde, "teste")
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }
}

  return (
    <form onSubmit={handleAgenda} >
    <div className='inicio'>
      <div className='informacao'>
        <h1>Olá, {dados}</h1>
        <div className='perfil'>
            <img src={Calendario} className='img-perfil' id='calend'/>
            <label><Link to='/agendados' className='link-agenda'>Agendamentos</Link></label>
            <img src={Perfil} className='img-perfil'/>
            <label><Link to='/dados-usuario' className='link-agenda'>Dados</Link></label>
        </div>
        <div className='busca' id='navega'>
          <label id='lab'>Medicamento</label>
          <input type="text"  placeholder='digite o medicamento prescrito na receita' value={nome} onChange={getNome} required/>
          {valores.length > 0 &&
            <ul className='listaorder'>
            {
                valores.map((item)=>(
                  <li className='lis' onClick={()=>{
                    setNome(item.nome_medicamento)
                    setIdMedicamento(item.id_medicamento)
                    console.log(item.id_medicamento)
                    setValores([])
                  }}>{item.nome_medicamento}</li>
                ))
              }
            </ul>
          }
          
          <label className='cep' id='lab'>Digite seu cep</label>
          <IMaskInput mask="00000-000" type="text" value={cep} onChange={e=> setCep(e.target.value)} required/>
          <label className='cep' id='lab'>Quantidade</label>
          <input type="text" placeholder='Digite a quantidade prescrita na receita' value={qtde} onChange={e=> setQtde(e.target.value)} required />
          <button className='local-unidade' onClick={getUniSaude}>Localizar unidades</button>
          <input type="text" default value={nomeUni}/>
          {saude.length > 0 &&
          <ul className='listasOr'>
              {
                saude.map((item)=>(
                  <li className='lis' onClick={()=>{
                    setNomeUni(item.nome_unidade)
                    setIdUnidade(item.id_posto)
                    setSaude([])
                  }} >{item.nome_unidade}</li>
                ))
              }
          </ul>
}
          {saude.length == 0 && <></>}
          <label className='cep' id='lab'>Escolha uma data</label>
          <input type='date' id='inp' value={data} onChange={e =>setData(e.target.value)} required />
          <label id='lab'>Escolha um horário</label>
          <input type='time' id='inp' value={time} onChange={e =>setTime(e.target.value)} required />
          <button>Concluir</button>
        </div>
        <div className='icone-local'>
          <img src={Med} className='local' id='localizarUni'/>
        </div>
      </div>

    </div>
    </form>
  )
}

export default Medicamentos