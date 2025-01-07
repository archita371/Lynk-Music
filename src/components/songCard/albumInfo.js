import React from 'react'
import './albumInfo.css'
function AlbumInfo({album,name}) {
    const artists = [];
    album?.artists?.forEach(element => {
        artists.push(element.name)
    })
    const total = artists.join(", ");
    
    const marqueeClass = total.length>20?"marquee":"";
  return (
    <div className='albuminfo'>
        <div className="albumName-container">
            {name}
            
        </div>
        <div className="artist">
            <div className={marqueeClass}>{`${artists.join(", ")}`}</div>
        </div>
        <div className="album-release">{album?.release_date.split("-")[0]}</div>
    </div>
  )
}

export default AlbumInfo