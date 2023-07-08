import React from 'react';
import './script.css';
import { Link } from 'react-router-dom';
import ImgCadastro from '../../assets/img2.png';
import { useState } from 'react';
import api from '../../api';


function Cadastrar(){

    const [uniName, setUnidade] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegistrer(e){
        e.preventDefault();
        try{
            const data = {
                uniName, endereco, cep, cnpj, responsavel, telefone, email, password
            };
            const response = await api.post('/cadUni', data);

            alert(`Unidade cadastrado com sucesso. Bem-vindo(a) ao sistema ${uniName}`);

            setUnidade('');
            setEndereco('');
            setCep('');
            setCnpj('');
            setResponsavel('');
            setTelefone('');
            setEmail('');
            setPassword('');
        }catch(err){
            alert(`Erro no cadastro. Tente novamente \n Código Erro: ${err} `);
        }
    }
    return(
      <form onSubmit={handleRegistrer}>
        <div className='cadastro-pai'>
            <div className='titulo-cadastro'>
                <h1>Cadastro</h1>
                <hr className='linha'/>
                <label><Link to='/cadastro' className='cadas-usu'>Usuário</Link></label>
                <label><Link to='/cadastro-unidade' className='cadas-uni'>Unidade</Link></label>
            </div>
            <div className='cadastro-dado'>
                <label>Unidade</label>
                <input type="text" placeholder='Digite o nome unidade' value={uniName} onChange={e => setUnidade(e.target.value)}required/>
                <label>Endereço</label>
                <input type="text" placeholder='Digite seu Endereço' value={endereco} onChange={e => setEndereco(e.target.value)}required />
                <label>CEP</label>
                <input type="text" placeholder='Digite o CEP' value={cep} onChange={e => setCep(e.target.value)}required/>
                <label>CNPJ</label>
                <input type="text" placeholder='Digite o CNPJ' value={cnpj} onChange={e => setCnpj(e.target.value)}required />
                <label>Telefone</label>
                <input type="text" placeholder='Digite seu Telefone' value={telefone} onChange={e => setTelefone(e.target.value)}required />
                <label>Responsável</label>
                <input type="text" placeholder='Digite o nome do(a) responsável' value={responsavel} onChange={e => setResponsavel(e.target.value)}required />
                <label>E-mail</label>
                <input type="text" placeholder='Digite seu E-mail' value={email} onChange={e => setEmail(e.target.value)}required />
                <label>Senha</label>
                <input type="password" placeholder='Digite seu Senha' value={password} onChange={e => setPassword(e.target.value)}required />
                <label>Confirma Senha</label>
                <input type="password" placeholder='Confirme sua Senha'value={password} onChange={e => setPassword(e.target.value)}required  />
                <button className='cadastro' >Cadastrar</button>
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