import React, { useEffect, useState } from 'react'
import APIKit from '../../spotify'
import { useNavigate } from 'react-router-dom';
import './library.css'
import Librarycard from './librarycard';
import LoadingOverlay from 'react-loading-overlay';
function name (name){
  return name;
}
function Library() {
  const [isLoading,setIsLoading] = useState(true);
  const [playLists, setPlayLists] = useState(null);
  useEffect(()=>{
    APIKit.get('me/playlists').then(function(response){
      setPlayLists(response.data.items);
      setIsLoading(false)
    })
  },[])
  
  const navigate = useNavigate();
  const playPlaylist= (id,name)=>{
    navigate('/player',{state:{id:id}})
  }
  if(isLoading)
  return (<div className='screen-container flex player'><LoadingOverlay
  active={true}
  spinner={true}
  text="Loading your content..."
></LoadingOverlay></div>)
  return (
    
    <div className='screen-container'>
      <div className="library-body">
        {playLists?.filter(function (playLists){
          return playLists.tracks.total !== 0
        }).map(playLists=>(
          <div key={playLists.id} onClick={()=>{playPlaylist(playLists.id,playLists.name)}} >
            <Librarycard name={playLists.name} image={playLists.images[0].url} track={playLists.tracks.total}/>
          </div>
        ))}
      </div>
    </div>
  )


}
export {name}
export default Library