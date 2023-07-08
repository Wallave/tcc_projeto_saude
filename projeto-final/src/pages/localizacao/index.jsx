import React from 'react';
import './script.css';
import Perfil from '../../assets/perfil.png';
import Local from '../../assets/img4.png';

function Localizar(){
    return(
        <div className='principal'>
            <div className='informacao'>
                <h1>Olá, Maria</h1>
                <h3>Localizar unidade</h3>
                <div className='perfil'>
                    <img src={Perfil} className='img-perfil'/>
                    <label>Visualizar Perfil</label>
                </div>
            </div>
            <div className='busca'>
                <label className='cep'>Digite seu cep</label>
                <input type='text'/>
                <input type='text' className='med'/>
                <button>Buscar medicamentos</button>
            </div>
            <div className='icone-local'>
                <img src={Local} className='local'/>
            </div>
        </div>
    )
}
export default Localizar