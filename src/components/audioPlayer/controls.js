import React from 'react'
import './controls.css'
import {AiFillPlayCircle,AiFillPauseCircle} from 'react-icons/ai'
import { BiSkipNext,BiSkipPrevious } from 'react-icons/bi'
function Controls(props) {
    function addZero(duration){
        if(duration<10) return (<span>0</span>)
    }
  return (
    <div className='control-main'>
      <div className='controlduration'>
        <div>00:{addZero(props.duration)}{props.duration}</div>
        <div>00:30</div>
    </div>
    <div className='playpause'>
      <BiSkipPrevious size={45} onClick={props.handlePrev}/>
      <div onClick={()=>props.setIsPlaying(!props.isPlaying)}>
      {props.isPlaying?(<AiFillPauseCircle size={45} />):(<AiFillPlayCircle size={45} />)}
      </div>
      
      <BiSkipNext size={45} onClick={props.handleNext}/>
    </div>
    </div>
    
    
  )
}
export default Controls