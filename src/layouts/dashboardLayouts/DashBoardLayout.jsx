import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ChatList from '../../components/chat_list/ChatList';
import './dashboardlayout.css'

const DashBoardLayout = () => {

  const {userId,isLoaded} = useAuth();
  const navigate = useNavigate()

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/signin");
    }
  },[isLoaded,userId,navigate]);

  if(!isLoaded) return "Loading...."

  return (
    <div className='dashboardlayout'>
        <div className="menu"><ChatList /></div>
        <div className="content">
            <Outlet />
        </div>
    </div>
  )
}

export default DashBoardLayout