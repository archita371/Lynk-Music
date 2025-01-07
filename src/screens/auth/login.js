import React from 'react'
import './login.css'
import { loginEndpoint } from '../../spotify'
import {BsSpotify} from 'react-icons/bs'
function Login() {
  return (
    <div className='login-page'>
      <div className='darkbg'>
      <div className='lynk'>LYNK Music</div>
        <div className='lynktext'>"Where words fail, music speaks"</div>
        <a href={loginEndpoint}><div className="login-btn">
          <div>
          <BsSpotify size={25}/>
          </div>
          <div className='texttext'>
          LOG IN WITH SPOTIFY
          </div>
          </div></a>
      </div>
        

    </div>
  )
}

export default Login