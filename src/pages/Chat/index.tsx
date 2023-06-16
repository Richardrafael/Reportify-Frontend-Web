import React, { useEffect, useState } from 'react';
import './chat.css';
import Menu from "../../components/menus";
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import LoaderRo from '../../components/loader/loaderRo';


interface a {
  conteudo : string,
  _id : string
  destinatario : string
  remetente : string

}

interface destina {
  nome : string
}

const Chat: React.FC = () => {
  const { id } = useParams()
  
  const { usuario } = useAuth()

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  // const [, setErrorMessage] = useState('');
  const [destinatario, setDestinatario] = useState<destina>();
  const [messages, setMessages] = useState<a[]>([
    // { content: 'Olá!', sender: 'user' },
    // { content: 'Olá! Como posso ajudar?', sender: 'bot' },
    // { content: 'Estou com um problema no meu pedido.', sender: 'user' },
    // { content: 'Qual é o problema? Posso te ajudar.', sender: 'bot' },
  ]);
  const [count, setCount] = useState(0);

  useEffect(()=>{
    (async () => {
      try {
        const response : any = await api.get(`/mensagem/${usuario?._id}/${id}/`)
        setMessages(response.data.reverse())

        const response2 : any = await api.get(`/usuario/${id}/`)
        setDestinatario(response2.data)

        let objDiv : any = document.getElementById("scroll");
        objDiv.scrollTop = objDiv.scrollHeight;
      } catch (response : any) {
        console.log(response.data.msg);
      }
      setLoading(false)
    })();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const newMessage : any = { _id: String(count + 1), conteudo: inputText, remetente: {_id: usuario?._id}, destinatario: {_id: id}};
      setCount(prev => prev + 1)
      console.log(newMessage)
      setMessages([...messages, newMessage]);
      setInputText('');
      try {
        await api.post('/mensagem/', {conteudo: inputText, remetente: usuario?._id, destinatario: id})
      } catch (response : any) {
        console.log(response.data.msg)
      }
    }
  };

  const handleKeyPress = (event : any) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (

    <><div className="flex flex-wrap flex-row">
          <Menu></Menu>
          <div id="contesudo" className="mt-16  bg-white flex-1 ">
              {destinatario && <div id='alinhatitulochat' className='font-bold text-center text-lg'><p >{destinatario.nome}</p></div>}
              <div className="p-10 flex flex-col">
                  <hr id="alinhahr"/>
                  {/* <h1 id="alinhatitulochat" >Chat</h1> */}
              </div>
          </div>
      </div>

      <div id="conteudo2">
        <div className="chat-container">
         <div className="messages-container" id="scroll">
          {
            !loading ? <>
              {messages.map((message : any) => (
                <div
                    key={message._id}
                    className={`message ${message.remetente._id === usuario?._id ? 'user' : 'bot'}`}
                >
                    {message.conteudo}
                </div>
              ))}
            </> : <LoaderRo />
          }
          </div>
          <div className="input-container">
            <input
              className='input-chat'
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage} className='botao-chat'>Enviar</button>
         </div>
       </div>
      </div>
    </>
  );
};

export default Chat;