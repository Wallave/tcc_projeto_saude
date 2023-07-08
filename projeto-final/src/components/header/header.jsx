import React from 'react';
import './header.css';
import Logo from '../../../src/assets/logo.png'
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
function Header(){

    function Deslogar(){
        sessionStorage.clear();
        window.location.reload(true);
    }

    const [logado, setLogado] = useState(true);
    const [dados, setDados] = useState('');

    useEffect(() =>{
        const logado = sessionStorage.getItem('login')
        const dados = sessionStorage.getItem('dados')
        setLogado(logado)
        setDados(dados)
        console.log(dados)
    }, []);


    return(
        <header>
           <Link to='/'> <img src={Logo} />
           </Link>
            <nav className='navegacao'>
                <ul>
                    {logado && <div className='divisaoInfo'> <h4 className='nome'>{dados}</h4> <h4 onClick={Deslogar} className='btnSair'>SAIR </h4></div>}
                    {!logado && <div><li><Link to='/login' className='link'>Login</Link></li><li><Link to='/cadastro' className='link'>Cadastro</Link></li></div>}
                </ul>
            </nav>
        </header>
        
    )
}
export default Header