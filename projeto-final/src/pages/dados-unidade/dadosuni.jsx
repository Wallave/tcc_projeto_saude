import React from 'react'
import './dadosuni.css'
import Dados from '../../assets/dadosUni.png'
import Local from '../../assets/localUni.png'
function DadosUni(){
    return(
        <div className='inteiro'>
            <div className='cabecalho'>
                <img src={Local} alt="" />
                <h4>Dados da unidade</h4>
            </div>
            <div className='info-img'>
                <div className='info-unidade'>
                    <label>Unidade</label>
                    <input type="text"/>
                    <label>Endereço</label>
                    <input type="text"/>
                    <label>CNPJ</label>
                    <input type="text"/>
                    <label>CEP</label>
                    <input type="text"/>
                    <label>Responsável</label>
                    <input type="text"/>
                    <label>Telefone</label>
                    <input type="text"/>
                    <label>E-mail</label>
                    <input type="email"/>
                </div>
                <div className='img-local'>
                    <img src={Dados}/>
                </div>
            </div>
        </div>
    )
}
export default DadosUni