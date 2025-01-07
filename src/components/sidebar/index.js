import React, { useEffect, useState } from 'react'
import './sidebar.css'
import SidebarButton from './sidebarButton'
// import {MdFavorite, MdSpaceDashboard} from 'react-icons/md'
import {FaGripfire, FaPlay, FaSignOutAlt} from 'react-icons/fa'
import {IoLibrary} from 'react-icons/io5'
import apiClient from '../../spotify'
function Sidebar() {
  const [image,setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU');
  useEffect(()=>{
    apiClient.get("me").then(response => setImage(response.data.images[0].url))
  })
  function signout() {
    window.localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <div className='sidebar-container'>
      <img src={image} className='profile-img' alt='profile' />

      <div>
        {/* <SidebarButton title='Feed' to='/feed' icon={<MdSpaceDashboard/>}/> */}
        <SidebarButton title='Trending' to='/trending' icon={<FaGripfire/>}/>
        <SidebarButton title='Player' to='/player' icon={<FaPlay/>}/>
        {/* <SidebarButton title='Favourites' to='/favourites' icon={<MdFavorite/>}/> */}
        <SidebarButton title='Library' to='/' icon={<IoLibrary/>}/>
          
      </div>
      <div onClick={signout}>
      <SidebarButton title='Sign Out' to='' icon={<FaSignOutAlt/>}/>
      </div>
      
    </div>
  )
}

export default Sidebar