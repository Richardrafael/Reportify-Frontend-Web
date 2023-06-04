// import Login from '../../pages/Login';
import {Routes , Route}  from "react-router-dom";
import CadastroRo from '../../pages/CadastroRo';
import TabelaRo from '../../pages/TabelaRO';
import ListagemUsuario from '../../pages/Membro_suporte';
import CadastroUsuario from '../../pages/CadastroUsuario';
import EditarUsuario from '../../pages/EditarUsuario';
import Contatos from '../../pages/Contatos';
import Notificacao from '../../pages/Notificacoes';
import Dashboard from '../../pages/Dashboard';
import Backup from '../../pages/Backup';
import EmailRedefinicao from '../../pages/EmailRedefinicao';
import RedefinirSenha from '../../pages/RedefinirSenha';

 

export default function Routas() {
        return(
    <Routes>
        <Route path='/' element={<TabelaRo/>}/>
        <Route path='*' element={<TabelaRo/>}/>
        {/* <Route path="backup" element={<Backup/>}/> */}
        <Route path='/CadastroRo' element={<CadastroRo/>}/>
        <Route path='/tabelaRo' element={<TabelaRo/>}/>
        <Route path='/membroSuporte' element={<ListagemUsuario/>}/>
        <Route path='/cadastroUsuarios' element={<CadastroUsuario/>}/>
        <Route path='/editar/:_id' element={<EditarUsuario/>}/>
        <Route path='/contatos' element={<Contatos/>}/>
        <Route path='/notificacoes' element={<Notificacao/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/forceBackup' element={<Backup/>}/>
        <Route path='/emailRedefinicao' element={<EmailRedefinicao/>}/>
        <Route path="/senha/:id/:firstTime" element={<RedefinirSenha />}/>
    </Routes>
        )
}