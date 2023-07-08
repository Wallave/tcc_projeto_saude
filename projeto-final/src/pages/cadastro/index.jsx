import React from 'react';
import './script.css';
import { Link, useNavigate } from 'react-router-dom';
import ImgCadastro from '../../assets/img2.png';
import {useState} from 'react'
import axios from 'axios';
import api from '../../api';
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Cadastrar(){



   

    let navigate = useNavigate();
    const [cliName, setCliName] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [dt_nascimento, setDt_nascimento] = useState('');
    const [cliEndereco, setCliEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [cliTelefone, setCliTelefone] = useState('');
    const [n_sus, setN_sus] = useState('');
    const [cliEmail, setCliEmail] = useState('');
    const [cliSenha, setCliSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');


    async function handleRegistrer(e){
        e.preventDefault();
        if(cliSenha != confirmeSenha){
            return toast.error(`As senhas não conferem!`, {
                position: "top-center",
                style: {width: '400px'},
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }else{
        try{
            const data = {
                cliName, rg, cpf, dt_nascimento, cliEndereco, cliTelefone, n_sus, cliEmail,
                cliSenha
            };
            const res = await api.post('/cadCli', data);
            
            let nome = cliName.split(' ')

            toast.success(`Cadastrado com sucesso`, {
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

            setCliName('');
            setRg('');
            setCpf('');
            setDt_nascimento('');
            setCliEndereco('');
            setCliTelefone('');
            setN_sus('');
            setCliEmail('');
            setCliSenha('');
            navigate("/login")
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
    }


    return(
        <form onSubmit={handleRegistrer}>
        <div className='cadastro-pai'>
            <div className='titulo-cadastro'>
                <h1 >Cadastro de usuário</h1>
            </div>
            <div className='cadastro-dado'>
                <label>Nome completo</label>
                <input type="text" placeholder='Digite seu nome' value={cliName} onChange={e => setCliName(e.target.value)} required />
                <label>RG</label>
                <input type="text" placeholder='Digite seu RG' value={rg} onChange={e => setRg(e.target.value)} required />
                <label>CPF</label>
                <IMaskInput mask="000.000.000-00" type="text" placeholder='Digite seu CPF' value={cpf} onChange={e => setCpf(e.target.value)} required/>
                <label>Data de Nascimento</label>
                <input type="date" placeholder='Digite sua data de nascimento' value={dt_nascimento} onChange={e => setDt_nascimento(e.target.value)} required/>
                <label>Endereço</label>
                <input type="text" placeholder='Digite seu Endereço' value={cliEndereco} onChange={e => setCliEndereco(e.target.value)} required />
                <label>Telefone</label>
                <IMaskInput mask="(00)00000-0000" type="text" placeholder='Digite seu Telefone' value={cliTelefone} onChange={e =>setCliTelefone(e.target.value)}required />
                <label>N° do SUS</label>
                <input type="text" placeholder='Digite seu SUS' value={n_sus} onChange={e => setN_sus(e.target.value)}required />
                <label>E-mail</label>
                <input type="email" placeholder='Digite seu E-mail' value={cliEmail} onChange={e =>setCliEmail(e.target.value)}required />
                <label>Senha</label>
                <input type="password" placeholder='Digite seu Senha' value={cliSenha} onChange={e =>setCliSenha(e.target.value)}required />
                <label>Confirma Senha</label>
                <input type="password" placeholder='Confirme sua Senha' value={confirmeSenha} onChange={e =>setConfirmeSenha(e.target.value)}required/>
                <button className='cadastro'>Cadastrar</button>
                <label className='conta'>Já tem conta ?<Link to='/login' className='link'> Clique aqui</Link></label>
            </div>
            <div className='imagem'>
                <img src={ImgCadastro}/>
            </div>
        </div>
        </form>
    )
}
export default Cadastrar