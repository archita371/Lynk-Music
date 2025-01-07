import React from 'react'
import './list.css'
import apiClient from '../../spotify'
function AddList({name,id,track_id,image}) {

    
  function addTrack () {
    apiClient.post(`/playlists/${id}/tracks`,{
        'uris':[
            `spotify:track:${track_id}`
        ]
    }).then(
        alert('Added to playlist')
    )
  }
  const url1 = '/public/playlist.jpg'
  return (
    <div className='listlist' onClick={addTrack}>
      <img src={image ? image:url1} alt="pimage" className='pimage' onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="playlist.jpg";
  }}/>
      {name}
    
    </div>

  )
}

export default AddList