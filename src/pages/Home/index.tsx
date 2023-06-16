import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import { FaEdit } from "react-icons/fa";
import "../../styles/global.css";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import Loader_preto from '../../components/loader/loaderpreto';


interface ro {
 map(arg0: (ro: any, i: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
 length: number;
}

function Home() {

  const { usuario } = useAuth();
  const [ros, setRos] = useState<ro>();
  const [myRos, setMyRos] = useState<ro>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
         if (usuario?.perfil == "admin") {
          const response : any = await api.get('/ro/atribuido/' + usuario?._id);
          setMyRos(response.data);
        setLoading(false);
      }else{
        const response2 : any = await api.get('/ro/relator/' + usuario?._id);
        console.log(response2.data[0].relator.id._id)
        setRos(response2.data);
      }
      setLoading(false);
    } catch (response : any) {
      console.log(response.data.msg);
    }
    
  })();
  }, []);


  

  return (
    <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div className="p-10 xl:ml-64 sm:ml-0 md:ml-52 flex items-center flex-col">
        <div className="flex p-10 w-full items-center  flex-col">
        <h1 className='text-3xl my-2 font-black'>Meus Ros</h1>
        <div className="flex w-full max-h-80  rounded-xl overflow-auto border-y border-slate-600 shadow-xl my-2 justify-center">
       { usuario?.perfil == "admin" ? <>
        {    
        myRos  && !loading ? <>
        {
         myRos.length == 0 ? <h1 className="text-3xl text-red-800 font-black " >{usuario?.nome} você não posssui Ros</h1> :
 <table className="w-full   md:table-fixed table-fixed ">
 <thead>
   <tr className="text-center border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-50  text-xl">
     <th className="border border-slate-700">ID</th>
     <th className="border border-slate-700">Título</th>
     <th className="border border-slate-700">Status</th>
     <th className="border border-slate-700">Colaborador</th>
     <th className="border border-slate-700">Responsável</th>
     <th className="border border-slate-700">Editar</th>
   </tr>
 </thead>
 <tbody >
    {myRos.map((ro : any , i : any)=> (
     <tr className={i % 2 === 0 ? 'bg-gray-200' : 'bg-white'} key={ro._id}>
     <td className="border border-slate-700 tex p-1">
       <div className="flex justify-center">
       <div className="flex text-white text-lg  bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl w-2/5 justify-center"> 
         {ro._id}
       </div>
       </div>
       
       </td>
     <td className="border border-slate-700 p-1 text-center">{ro.tituloOcorrencia.charAt(0).toUpperCase()+ ro.tituloOcorrencia.slice(1)}</td>
     <td className="border border-slate-700 p-1  text-center">
       <div className="flex justify-center">
       <div className={
         ro.suporte ? 
         ro.suporte.fase == "concluido" ?
         "bg-green-500 rounded-xl w-3/4 " : 
         ro.suporte ? 
         ro.suporte.fase == "validacao" ? 
         "bg-yellow-400 rounded-xl w-3/4 " : "bg-slate-300 rounded-xl w-3/4" : 
         ""
         : "bg-slate-300 rounded-xl w-3/4" }>
       {ro.suporte ? ro.suporte.fase.charAt(0).toUpperCase() + ro.suporte.fase.slice(1) : "Pendente" }
       </div>
       </div>
       </td>
     <td className="border border-slate-700 p-1">
       <div className="flex justify-center text-center">
       <div className={ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? "bg-primary text-white rounded-xl w-3/4" : "bg-slate-300 rounded-xl w-3/4"}>
         {ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? ro.suporte.colaboradorIACIT.id.nome : "A definir"}
         </div>
         </div>
         </td>
     <td className="border border-slate-700 p-1 text-center ">{ro.responsavel ? ro.responsavel.nome.charAt(0).toUpperCase() + ro.responsavel.nome.slice(1) : "a"}</td>
     <td className="border border-slate-700 p-1">
       <div className="flex w-full items-center justify-center ">
         <button  className="curso-pointer p-2 ">
           <FaEdit size={24}/>
         </button>
       </div>
         </td>
   </tr>
   ))}
   </tbody>
     </table>
        }
       
       </> : (
        <>
      <Loader_preto/>
        </>
      )
    
    }
  </>
   :
  <>
    { ros && !loading ?(
                  
                  <table className="w-full   md:table-fixed table-fixed ">
              <thead>
                <tr className="text-center border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-50  text-xl">
                  <th className="border border-slate-700">ID</th>
                  <th className="border border-slate-700">Título</th>
                  <th className="border border-slate-700">Status</th>
                  <th className="border border-slate-700">Colaborador</th>
                  <th className="border border-slate-700">Relator</th>
                  <th className="border border-slate-700">Editar</th>
                </tr>
              </thead>
              <tbody >
                {ros.map((ro , i)=> (
                  <tr className={i % 2 === 0 ? 'bg-gray-200' : 'bg-white'} key={ro._id}>
                  <td className="border border-slate-700 tex p-1">
                    <div className="flex justify-center">
                    <div className="flex text-white text-lg  bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl w-2/5 justify-center"> 
                      {ro._id}
                    </div>
                    </div>
                    
                    </td>
                  <td className="border border-slate-700 p-1 text-center">{ro.tituloOcorrencia.charAt(0).toUpperCase()+ ro.tituloOcorrencia.slice(1)}</td>
                  <td className="border border-slate-700 p-1  text-center">
                    <div className="flex justify-center">
                    <div className={
                      ro.suporte ? 
                      ro.suporte.fase == "concluido" ?
                      "bg-green-500 rounded-xl w-3/4 " : 
                      ro.suporte ? 
                      ro.suporte.fase == "validacao" ? 
                      "bg-yellow-400 rounded-xl w-3/4 " : "bg-slate-300 rounded-xl w-3/4" : 
                      ""
                      : "bg-slate-300 rounded-xl w-3/4" }>
                    {ro.suporte ? ro.suporte.fase.charAt(0).toUpperCase() + ro.suporte.fase.slice(1) : "Pendente" }
                    </div>
                    </div>
                    </td>
                  <td className="border border-slate-700 p-1">
                    <div className="flex justify-center text-center">
                    <div className={ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? "bg-primary text-white rounded-xl w-3/4" : "bg-slate-300 rounded-xl w-3/4"}>
                      {ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? ro.suporte.colaboradorIACIT.id.nome : "A definir"}
                      </div>
                      </div>
                      </td>
                  <td className="border border-slate-700 p-1 text-center ">{ro.relator.id ? ro.relator.id.nome.charAt(0).toUpperCase() + ro.relator.id.nome.slice(1) : "N/A"}</td>
                  <td className="border border-slate-700 p-1">
                    <div className="flex w-full items-center justify-center ">
                      <button  className="curso-pointer p-2 ">
                        <FaEdit size={24}/>
                      </button>
                    </div>
                      </td>
                </tr>
                ))}
                </tbody>
                  </table>
                  ) : (
                  <>
                <Loader_preto/>
                  </>
                )
              
              }
   </> }

{/* {  ros && !loading ?(
  <>
  <h1>aaaaa</h1>
  </>      
     ) : (
      <>
    <Loader_preto/>
      </>
    ) }  */}
      
      </div>      
        </div>   
    </div>
    </div>
  );
};


export default Home