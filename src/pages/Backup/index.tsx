import Menu from "../../components/menus";
import api from "../../services/api";
import "../../styles/global.css";

function Backup() {


  async function forceBackup() {
    try {
      alert('Backup Iniciado!!');
       await api.post('/forceBackup');

    } catch (response : any) {
      console.log(response.data.msg);
    }
  }

  async function forceRestore() {

    try {
      alert('Restauração Iniciada!!');

       await api.post('/forceRestore');

    } catch (response : any) {
      alert(response.data.msg);
    }
    }

  return (
    <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div className="mt-16  bg-white flex-1 ">
        <div className="p-10 xl:ml-64 sm:ml-0 md:ml-52 flex items-center flex-col">
          <h1 className="text-2xl">Este site foi desenvolvido para criar o backup do banco de dados de mês em mês automaticamente.</h1>
          <h1 className="text-2xl">Porém, o botão abaixo força a criação de um arquivo de backup do banco de dados atual.</h1>
          <button onClick={forceBackup} className='w-40 py-3 rounded-xl text-center  mb-10 mt-5 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl' id='botao_backup'>Forçar Backup</button>
          
          <h1 className="text-2xl">O botão abaixo proporciona a opção de restauração do banco de dados utilizando </h1>
          <h1 className="text-2xl">o último arquivo de backup criado.</h1>
          <button onClick={forceRestore} className='w-40 py-3 rounded-xl text-center  mb-10 mt-5 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl' id='botao_restore'>Restaurar Backup</button>

          <h1 className="text-2xl">Tratando-se de segurança de dados dos usuários, nossa empresa se responsabiliza pela utilização</h1>
          <h1 className="text-2xl">de tais, tendo portanto um arquivo com termos de compromisso que temos aos nossos clientes</h1>
          <button className='w-40 py-3 rounded-xl text-center  mb-10 mt-5 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl' id='botao_termos'><a href="https://docs.google.com/document/d/e/2PACX-1vS95FEPOWKp-Kp2GidnxjKPfdNse9LGssZFxurbmqgSw09eIIfwxXjvZUmzr0UwWLLt5XviUjmHXQE8/pub"> Termos de Compromisso</a></button>
        </div>
      </div>
    </div>
  );
}

export default Backup;
