import Login from '../pages/Login';
import Home from '../pages/Home'
import {Routes , Route}  from "react-router-dom";
import CadastroRo from '../pages/CadastroRo';
import TabelaRo from '../pages/TabelaRO';
import MembroSuporte from '../pages/Membro_suporte';
import CadastroUsuario from '../pages/CadastroUsuario';
import Contatos from '../pages/Contatos';
import Notificacao from '../pages/Notificacoes';


export default function Routas() {
        return(
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/CadastroRo' element={<CadastroRo/>}/>
        <Route path='/tabelaRo' element={<TabelaRo/>}/>
        <Route path='/membroSuporte' element={<MembroSuporte/>}/>
        <Route path='/cadastroUsuarios' element={<CadastroUsuario/>}/>
        <Route path='/contatos' element={<Contatos/>}/>
        <Route path='/notificacao' element={<Notificacao/>}/>
    </Routes>
        )
}