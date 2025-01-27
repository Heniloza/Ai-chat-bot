import React from 'react';
import './chatpage.css';
import NewPrompt from '../../components/newPrompt/NewPrompt';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop()  
  
   const { isPending, error, data } = useQuery({
      queryKey: ["chat",chatId],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,{credentials:"include"}).then((res) =>
          res.json(),      
    )
    });

  return (
    <div className='chatpage'>
      <div className="wrapper">
        <div className="chat">
          {isPending?"Loading...":
          error?"Something went wrong":
          data?.history?.map((msg,index)=>(
            <>
            {msg.image && (
              <IKImage
              urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
              path={msg.image}
              height="300"
              width="400"
              transformation={[{height:300,width:400}]}
              loading="lazy"
              lqip={{active:true,quality:20}}
              />
            )}
          <div key={index} className={msg.role==="user"?"message user":"message"}>
            <Markdown>{msg.parts[0].text}</Markdown>
          </div>
          </>
          ))}
          <NewPrompt data={data}/>

        </div>
      </div>
    </div>
  )
}

export default ChatPage