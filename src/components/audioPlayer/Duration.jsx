import React from 'react'
import './controls.css'
function Duration(props) {
    
        function addZero(duration){
            if(duration<10) return (<span>0</span>)
        }
      return (
        <div className='control-main'>
          <div className='controlduration'>
            <div>00:{addZero(props.duration)}{props.duration}</div>
            <div>00:30</div>
        </div>
        </div>)
}

export default Duration