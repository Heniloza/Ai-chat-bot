import React from 'react';
import './chatpage.css';
import NewPrompt from '../../components/newPrompt/NewPrompt';

const ChatPage = () => {

  return (
    <div className='chatpage'>
      <div className="wrapper">
        <div className="chat">

          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div><div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div><div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div><div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div><div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div><div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>
          <div className="message">Text Messagae from ai</div>
          <div className="message user">Text Messagae from user</div>

          <NewPrompt />

        </div>
      </div>
    </div>
  )
}

export default ChatPage