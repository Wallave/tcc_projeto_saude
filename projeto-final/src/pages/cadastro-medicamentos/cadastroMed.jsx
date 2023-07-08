import React from 'react'
import './cadastroMed.css'
import Remedio from '../../assets/remedio.png'
import Perfil from '../../assets/perfil.png'
import LogoCadMed from '../../assets/logoCadMed.png'
import LogoCruz from '../../assets/simboloCruz.png'
import Calendario from '../../assets/calendario.png'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../api'
import {toast} from 'react-toastify'

function CadastroMed() {

  const [dados, setDados] = useState('');
  const [ident, setIdent] = useState(null);
  const [medicamento, setMedicamento] = useState([]);
  const [valores, setValores] = useState([])
  useEffect(() =>{
    const dados = sessionStorage.getItem('dados')
    const ident = sessionStorage.getItem('dadosid')
    setIdent(ident)
    setDados(dados)
    
    async function getMedi(){
      const {data} = await api.get('/medicamentos');
      setMedicamento(data);
      console.log(data)
      
    }
    getMedi();
  }, []);
    
  const [nome_med, setNome_Med] = useState(null);
  const [idmedicamento, setIdmecidamento] = useState(null)
  const [uni_med, setUni_Med] = useState(null);
  const [cdg_med, setCdg_Med] = useState(null);
  const [qtde, setQtde] = useState(null);
  const [vencimento, setVencimento] = useState(null);
  const [data_entrada, setData_Entrada] = useState(null);
  

  function getNome(e){
    setNome_Med(e.target.value);
    const nome = e.target.value;
    console.log(nome)
    setValores ( medicamento.filter(item => item.nome_medicamento.toUpperCase().includes(nome.toUpperCase())))
    console.log(valores)
  }

  async function handleRegistrer(e){
    e.preventDefault();
    try{
      const data = {
         cdg_med, qtde, vencimento, data_entrada, idmedicamento, id_posto:ident
      };
      const response = await api.post('/cadMed', data);
      console.log(response)

      toast.success(`O medicamento foi cadastrado com sucesso no banco`, {
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

      setNome_Med('');
      setUni_Med('');
      setCdg_Med('');
      setQtde('');
      setVencimento('');
      setData_Entrada('');
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



  return (
    
    <div className='tela'>
      <div className='topoInfo'>
        <div className='centro'>
          <h2 className='centroDados'>{dados}</h2>
        </div>
        <div className='logoRem'>
          <img src={Remedio} className='remedio' id='img-rem' />
          <h4 id='informacaomede'>Cadastrar Medicamentos</h4>
          
          <img src={Calendario} className='remedio'/>
          <h4 className='linkmed'><Link to="/agendamentos-posto" className='linkmed'>Agendamentos</Link></h4>
          <img src={LogoCruz} className='logo-cruz'/>
        </div>
        <div className='img-cruz'>
          <form onSubmit={handleRegistrer} className='informacoes'>
            <label>Nome do medicamento</label>
            <input type="text" placeholder='Digite o nome do medicamento' value={nome_med} onChange={getNome} required />
            <ul className='lista'>
              {
                valores.map((item)=>(
                  <li className='lis' onClick={()=>{
                    setNome_Med(item.nome_medicamento)
                    setIdmecidamento(item.id_medicamento)
                    console.log(item.id_medicamento)
                    setValores([])
                  }} >{item.nome_medicamento}</li>
                ))
              }
            </ul>
            <label>Código do medicamento</label>
            <input type="text" placeholder='Digite o código do medicamento' value={cdg_med} onChange={e =>setCdg_Med(e.target.value)} required />
            <label>Quantidade</label>
            <input type="text" placeholder='Digite a quantidade dos medicamentos' value={qtde} onChange={e =>setQtde(e.target.value)} required />
            <label>Vencimento</label>
            <input type="date" placeholder='Digite a data de vencimento' value={vencimento} onChange={e =>setVencimento(e.target.value)} required />
            <label>Data de entrada</label>
            <input type='datetime-local' value={data_entrada} onChange={e =>setData_Entrada(e.target.value)} required />
            <button >Cadastrar</button>
          </form>
        </div>
      </div>
      <div className='logoMed'>
          <img src={LogoCadMed} className='logocadmed'/>
      </div>
    </div>
    
  )
}

export default CadastroMed