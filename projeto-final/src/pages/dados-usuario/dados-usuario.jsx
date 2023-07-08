import React from 'react'
import './dados-usuario.css'
import { Link } from 'react-router-dom'
import Perfil from '../../assets/perfil.png'
import Calendario from '../../assets/calendario.png'
import {useState, useEffect} from 'react';
import api from '../../api'
import { toast } from 'react-toastify'
import { IMaskInput } from 'react-imask';
import moment from 'moment'
import 'moment/locale/pt-br'
import { timeout } from 'q'
function DadosUsu() {

    const [nome, setNome] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [dt_nascimento, setDt_nascimento] = useState('');
    const [endereco, setEndereco] = useState('');
    const [tel, setTel] = useState('');
    const [sus, setSus] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dados, setDados] = useState('');
    const [valor, setValor] = useState([]);


    useEffect(() =>{
        const dados = sessionStorage.getItem('dadosId')
        setDados(dados);

        async function updateUser(){
            const {data} = await api.get(`/updateUser/${dados}`);
            setValor(data);
            console.log(data)
            setNome(data[0].nome)
            setRg(data[0].rg)
            setCpf(data[0].cpf)
            setDt_nascimento(moment(data[0].dt_nascimento).format('L'))
            setEndereco(data[0].endereco)
            setTel(data[0].telefone)
            setSus(data[0].n_sus)
            setEmail(data[0].email)
            setSenha(data[0].senha)
            
        }
        updateUser();
        
    }, []);
    async function updateRegister(e){
        e.preventDefault();
        moment.locale('pt-br')
        console.log(moment.locale())

        try{
            const dado ={
            nome, rg, cpf,dt_nascimento /*moment(dt_nascimento).format('L')*/, endereco, tel, sus, email, senha
            };
            const res = await api.put(`/updateUser/${dados}`, dado);
            toast.success(`Alteração efetuada`,{
                style: {width: '400px'},
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",  
            });
            setTimeout(()=>{
                window.location.reload(true);
            }, 2000)
            
        }catch(err){
            toast(`Houve um erro na requisição ${err}`, {
                style: {width: '400px'},
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
        }
    }
    
    
    




    return(
        <form>
        <div className='info-usuario'>
            <div className='cabecalho-usuario'>
                <img src={Perfil}/>
                <h4 id='textdados'>Dados</h4>
                <img src={Calendario} id='imgdados'/>
                <h4 id='textdados'><Link to='/agendados' id='linksAge'>Agendamentos</Link></h4>
            </div>
            <div className='dados-img'>
                <div id='dados-usu'>
                    <label>Nome completo</label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required/>
                    <label>RG</label>
                    <input type="text" value={rg} onChange={e => setRg(e.target.value)} required />
                    <label>CPF</label>
                    <IMaskInput mask="000.000.000-00" type="text" value={cpf} onChange={e =>setCpf(e.target.value)} required />
                    <label>Data de nascimento</label>
                    <IMaskInput mask="00/00/0000"  type="text" value= {dt_nascimento} onChange={e => setDt_nascimento(e.target.value)} required />
                    <label>Endereço</label>
                    <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} required />
                    <label>Telefone</label>
                    <input type="text" value={tel} onChange={e => setTel(e.target.value)} required />
                    <label>N° SUS</label>
                    <input type="text" value={sus} onChange={e => setSus(e.target.value)} required />
                    <label>Email</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
                    <label>Senha</label>
                    <input type="text" value={senha} onChange={e => setSenha(e.target.value)} required />
                    <button onClick={updateRegister}>Alterar Dados</button>
                </div>
                <div className='img-dados'>
                    <img src={Perfil} />
                </div>
            </div>
        </div>
        </form>
    )
}

export default DadosUsu