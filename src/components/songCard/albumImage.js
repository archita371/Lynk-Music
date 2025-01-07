import React from 'react'
import './albumImage.css'
function AlbumImage({url}) {
  return (
    <div className='album-art'>
        <img src={url} alt="album-art" />
    </div>
  )
}

export default AlbumImage