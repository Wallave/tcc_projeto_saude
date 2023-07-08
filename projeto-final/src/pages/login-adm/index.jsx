import React from 'react';
import './script.css';
import {Link, useNavigate} from 'react-router-dom';
import ImgLogin from '../../assets/img1.png';
import api from '../../api';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import {toast} from 'react-toastify'

function Login(){

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    let navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const dataLogin = {
                email, password
            }

        const {data} = await api.post('/loginUni', dataLogin);

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
        sessionStorage.setItem("token",data.token );
        const dados = jwt_decode(data.token)
        sessionStorage.setItem("dados", dados.name);
        sessionStorage.setItem("dadosid", dados.id_posto);
        setTimeout(()=>{
        navigate("/agendamentos-posto");
        window.location.reload(true);
        }, 2000);
        } catch(err){
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
        <form onSubmit={handleLogin}>
        <div className='login-pai'>
            <div className='login'>
                <h1>Login</h1>
                <hr className='linha-login'/>
                <label><Link to='/login' className='log-usu'>Usuário</Link></label>
                <label><Link to='/login-adm' className='log-uni'>Unidade</Link></label>
                <div className='conteudo-login'>
                    <label >E-mail</label>
                    <input type='text' placeholder='Digite seu e-mail' value={email} onChange={e => setEmail(e.target.value)} required/>
                    <label >Senha</label>
                    <input type='password' placeholder='Digite sua senha' value={password} onChange={e  =>setPassword(e.target.value)} required />
                    <button className='entrar' >Entrar</button>
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