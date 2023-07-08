import React from 'react';
import './script.css';
import {Link, useNavigate} from 'react-router-dom';
import ImgLogin from '../../assets/img1.png';
import api from '../../api';
import { useState } from 'react';
import {toast} from 'react-toastify';
import jwt_decode from 'jwt-decode';
import {IMaskInput} from 'react-imask';


function Login(){

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    let navigate = useNavigate();

    
    async function handleLoginCli(e){
        e.preventDefault();
        try{
            const dataLogin = {
                email, password
            }

            const {data} = await api.post('/loginCli',dataLogin);

            toast.success(`Login efetuado com sucesso`, {
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

            sessionStorage.setItem("login", true);
            sessionStorage.setItem("token",data.token);
            const dados = jwt_decode(data.token);
            sessionStorage.setItem("dados",dados.name);
            sessionStorage.setItem("dadosId",dados.id_posto)
            setTimeout(() =>{

            
            navigate("/agendados");
            window.location.reload(true);
        }, 1000);
        } catch {
            toast.success(`Houve um erro na requisição`, {
                style: {width: '400px'},
                position: "top-center",
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

    return(
        <form onSubmit={handleLoginCli} >
        <div className='login-pai'>
            <div className='login'>
                <h1>Login</h1>
                <hr className='linha-login'/>
                <label><Link to='/login' className='login-usu'>Usuário</Link></label>
                <label><Link to='/login-adm' className='login-uni'>Unidade</Link></label>
                <div className='conteudo-login'>
                    <label >CPF ou E-mail</label>
                    <input  type='text' placeholder='Digite seu cpf ou e-mail' value={email} onChange={e =>setEmail(e.target.value)} required />
                    <label >Senha</label>
                    <input type='password' placeholder='Digite sua senha' value={password} onChange={e =>setPassword(e.target.value)} required />
                    <button className='entrar'>Entrar</button>
                    <label className='esquece-senha'>Não tem cadastro ainda?<Link to='/cadastro' className='link'> Clique aqui</Link></label>
                </div>
            </div>
            <div className='img'>
              <img src={ImgLogin} /> 
            </div>
        </div>
        </form>
    )
}
export default Login