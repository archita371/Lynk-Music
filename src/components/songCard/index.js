import React from 'react'
import './songCard.css'
import AlbumImage from './albumImage'
import AlbumInfo from './albumInfo'
function SongCard({album,name}) {
  return (
    <div className='songCard-body'>
        <AlbumImage url={album?.images[0]?.url}/>
        <AlbumInfo album={album} name={name}/>
    </div>
  )
}

export default SongCard