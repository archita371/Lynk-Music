import React from 'react'
import { IconContext } from 'react-icons'
import {BsPlayCircleFill} from 'react-icons/bs'
import './library.css'
function Librarycard(props) {
  return (
    <div>
        <div className='playlist-card' style={{backgroundImage:`url(${props.image})`}}>
            <div className="playlist-fade">
                <IconContext.Provider value={{size:"35px",color:"whitesmoke"}}>
                    <BsPlayCircleFill />
                </IconContext.Provider>
            </div>
        </div>
        <div className='name'>{props.name}</div>
        <div className='tracks'>{props.track} Songs</div>
        
    </div>
    
  )
}

export default Librarycard