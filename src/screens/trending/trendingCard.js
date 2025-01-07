import React from 'react'
import { IconContext } from 'react-icons'
import {BsPlayCircleFill} from 'react-icons/bs'
import './trending.css'
function TrendingCard(props) {
  return (
    <div>
        <div className='playlist-card1' style={{backgroundImage:`url(${props.image})`}}>
            <div className="playlist-fade1">
                <IconContext.Provider value={{size:"35px",color:"whitesmoke"}}>
                    <BsPlayCircleFill />
                </IconContext.Provider>
            </div>
        </div>
        <div className='name1'>{props.name}</div>
        <div className='tracks1'>{props.track} Songs</div>
        
    </div>
    
  )
}

export default TrendingCard