import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import api from "../../services/api";
import 'react-toastify/dist/ReactToastify.css';
import { VictoryPie, VictoryTooltip } from 'victory'
import LoaderRo from "../../components/loader/loaderRo";

interface chart {
  perfil : string,
}

interface aahartPie {
  id: string;
  label: string;
  value: any;
  color: string;
}

interface Usuario {
  id: string;
  nome: string;
}

function Dashboard () {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<aahartPie[]>([])
  // const [chartDataLine, setChartDataLine] = useState([])
  const [selected] = useState('')
  const [date, setDate] = useState('')
  const [dates, setDates] = useState([])
  const [usuario, setUsuario] = useState<string | undefined>(undefined);

  const [usuarios, setUsuarios]= useState<Usuario[]>([])
  const [totalROs, setTotalROS] = useState("")

  

  useEffect(() => {
    (async () => {
      try {
        if (!date) {
          const response : any = await api.get('/dashboard/dates');
          setDates(response.data);
          setDate(response.data[0])
        }

        if (!usuario) {
          const response2 : any = await api.get('/usuario');
          const list : any = response2.data
          list.unshift({ _id: "geral", nome: "Geral" } as unknown as chart[] ) 
          setUsuarios(list)
          setUsuario(response2.data[0]._id)
        }

        if (date && usuario) {
          const response3 = await api.get('/dashboard/data/' + date + '/' + usuario );
          const data : any = response3.data

          setTotalROS(String(data.total))

          const chartPie =  [{
            id: "1",
            label: "Sem tratamento",
            value: data.aberto,
            color: '#878787'
          },
          {
            id: "2",
            label: "Em tratamento",
            value: data.andamento,
            color: "#72A2FA"
          },
          {
            id: "3",
            label: "Solucionado",
            value: data.fechado,
            color: "#2B3467"
          }]

          setChartData(chartPie)
        }
      } catch (response: any) {
        alert(response.data.msg);
      }
      setLoading(false)
    })();
  }, [date, usuario])

  return(
    <div className="flex flex-wrap flex-row">
      <Menu/>
        <div className="mt-16 w-full flex-1">
          <div className="p-10 xl:ml-64 sm:ml-0 md:ml-52 flex items-center flex-col">
            <p className="text-3xl mb-2 font-black">Dashboard</p>
            {!loading ? 
            <>
            <div className="flex w-full mt-5 justify-center">
              <div className="bg-gray-200 rounded-xl w-3/4 shadow-md flex flex-wrap flex-row justify-center">
                <div className="mr-14 my-auto w-3/12">
                  <div className="mb-5">
                    <label htmlFor="data" className="block text-gray-700 font-bold mb-2">
                      Data:
                    </label>
                    <select
                      name="data"
                      className="border-b border-gray-400 w-full focus:border-primary focus:outline-none px-2 py-0 flex-grow"
                      onChange={e => setDate(e.target.value)}
                      id="data"
                      value={date}
                    >
                    {dates && dates.map((date) => (
                      <option value={date} key={date}>
                        {date}
                      </option>
                    ))}
                    </select>
                  </div>
                  <label htmlFor="data" className="block text-gray-700 font-bold mb-2">
                    Usuário:
                  </label>
                  <select
                    name="usuario"
                    className="border-b border-gray-400 w-full focus:border-primary focus:outline-none px-2 py-0 flex-grow"
                    onChange={e => setUsuario(e.target.value)}
                    id="usuario"
                    value={usuario}
                  >
                  {usuarios && usuarios.map((usuario : any) => (
                    <option value={usuario._id} key={usuario._id}>
                      {usuario.nome}
                    </option>
                  ))}
                  </select>
                  <p className="text-base text-center my-2 font-black mt-10">Total de Ros: {totalROs}</p>
                </div>
                <div className="w-5/12">
                {chartData &&
                  (totalROs === "0") ? 
                    <p className="text-base text-center  font-black my-14">Não há nenhum dado de RO para este gráfico.</p>
                  :
                  <VictoryPie 
                    data={chartData}
                    x="label"
                    y="value"
                    colorScale={['#878787', '#72A2FA' , '#2B3467']}
                    innerRadius={75}
                    animate={{
                      duration: 2000,
                      easing: "linear"
                    }}
                    style={{
                        labels: {
                          fill: 'white'
                        },
                        data: {
                          fillOpacity: ({datum}) => (datum.id === selected || selected === "") ? 1 : 0.3,
                          stroke: ({datum}) => (datum.id === selected) ? 'black' : 'none',
                          strokeWidth: 3,
                          strokeOpacity: 0.5
                        }
                    }}
                    labelComponent={
                      <VictoryTooltip 
                        renderInPortal={false}
                        flyoutStyle={{
                          stroke: 0,
                          fill: ({datum}) => datum.color
                        }}
                      />
                    }
                  />
                  }
                </div>
              </div>
            </div> 
            <div className="flex flex-wrap flex-row w-full justify-center">
              {chartData[0] &&  
                <div className="border-t-4 border-gray-500 bg-gray-200 rounded-xl w-3/12 mt-5 mr-5 p-5 shadow-md">
                  <p className="text-base text-center my-2 font-black">RO's sem tratamento</p>
                  <p className="text-3xl text-center my-2 font-black">{chartData[0].value}</p>
                </div>
              }
              {chartData[1] &&  
                <div className="border-t-4 border-blue-500 bg-gray-200 rounded-xl w-3/12 mt-5 p-5 shadow-md">
                  <p className="text-base text-center my-2 font-black">RO's em tratamento</p>
                  <p className="text-3xl text-center my-2 font-black">{chartData[1].value}</p>
                </div>
              }
              {chartData[2] &&
                <div className="border-t-4 border-blue-900 bg-gray-200 rounded-xl w-3/12 mt-5 ml-5 p-5 shadow-md">
                  <p className="text-base text-center my-2 font-black">RO's solucionados</p>
                  <p className="text-3xl text-center my-2 font-black">{chartData[2].value}</p>
                </div>
              }
              </div>
              </>
              :
              <div className="mt-5">
                <LoaderRo />
              </div>
              }
          </div>
        </div>
      </div>
  );
}

export default Dashboard