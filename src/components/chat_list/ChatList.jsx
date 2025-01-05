import React from 'react'
import './chatlist.css'
import { Link } from 'react-router-dom'

const ChatList = () => {
  return (
    <div className='chatlist'>
        <span className='title'>DashBoard</span>
        <Link to="/dashboard">Create a chat</Link>
        <Link to='/'>Explore</Link>
        <Link to='/'>Contact</Link>
        <hr />
        <span className='title'>Recent Chats</span>
        <div className="list">
            <Link>Testing</Link>
            <Link>Testing</Link>
            <Link>Testing</Link>
            <Link>Testing</Link>
            <Link>Testing</Link>
            <Link>Testing</Link>
        </div>
        <hr />
        <div className="upgrade">
            <img src="/logo.png" alt="" />
            <div className="texts">
                <span>Upgrade to Pro Dev</span>
                <span>Get unlimited access for all features</span>
            </div>
        </div>
    </div>
  )
}

export default ChatList