import './App.css';
import Header from './components/header/header';
import Login from './pages/login/index';
import Cadastro from './pages/cadastro/index';
import Localizar from './pages/localizacao/index';
// import Agendamento from './pages/agenda/index'
import Medicamento from './pages/medicamentos/index';
import LoginUni from './pages/login-adm/index'
import Inicio from './pages/inicio/inicio'
import DadosUni from './pages/dados-unidade/dadosuni'
import Agendados from './pages/agendadosCad/agendados'
import CadastroMed from './pages/cadastro-medicamentos/cadastroMed';
import DadosUsu from './pages/dados-usuario/dados-usuario'
import AlterCad from './pages/alterarCad/alterarCad'
import AgendamentoPost from './pages/agendadosPost/agendados'
import ProtectedRouter  from './protected';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer 
        autoClose={5000}
        pauseOnFocusLoss={false}
      />
        <Header/>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="/login" element={<Login/>} />
            <Route path ="/login-adm" element={<LoginUni/>}/>
          {/* <Route path="/agendamento" element={<Agendamento/>}/> */}

          <Route element={<ProtectedRouter/>}>  
            <Route path="/localizar" element={<Localizar/>}/>
            <Route path="/medicamento" element={<Medicamento/>}/>
            <Route path="/dados-unidade" element={<DadosUni/>}/>
            <Route path="/agendados" element={<Agendados/>}/>
            <Route path="/dados-usuario" element={<DadosUsu/>}/>
            <Route path="/Cadastro-medicamentos" element={<CadastroMed/>}/>
            {/* <Route path="/alterar-cadastro" element={<AlterCad/>}/> */}
            <Route path="/agendamentos-posto" element={<AgendamentoPost/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
