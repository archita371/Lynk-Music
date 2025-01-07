import React, { useEffect, useRef, useState } from 'react'
import './player.css'
import { useLocation } from 'react-router-dom'
import apiClient from '../../spotify';
import SongCard from '../../components/songCard';
import Queue from '../../components/queue';
import AudioPlayer from '../../components/audioPlayer';
import LoadingOverlay from "react-loading-overlay";
function Player() {
  const [isLoading,setIsLoading] = useState(true);
  const location = useLocation();
  const [tracks,setTracks] = useState([]);
  const [currentTrack,setCurrentTrack] = useState({});
  const [currentIndex,setCurrentIndex] = useState(0);
  let MeArray= useRef([]);
  let user_id = useRef('');

  useEffect(()=>{
    if(location.state){
      apiClient.get("playlists/" + location.state?.id + "/tracks")
      .then(res=>{
        
        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0].track);
        
      })
    }
  },[location.state])

  useEffect(()=>{
    setCurrentTrack(tracks[currentIndex]?.track)
    },[currentIndex, tracks])
  
  useEffect(()=>{
    apiClient.get('me').then(response=>user_id.current=response.data.id);
  },[])

  useEffect(()=>{
    apiClient.get('/me/playlists').then(
      (response)=>{
        MeArray.current = response.data.items.filter(function (el){
          return el.owner.id === user_id.current
        })
        setIsLoading(false)
      }
    )
  },[])

  if(isLoading)
  return (<div className='screen-container flex player'><LoadingOverlay
  active={true}
  spinner={true}
  text="Loading your content..."
></LoadingOverlay></div>)
  return (
        <>
        {  
          location.state?(
            <div className='screen-container flex player'>
            <div className='left-player-body'>
            <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} setTracks={setTracks} user_id={user_id} MeArray={MeArray.current} currentIndex={currentIndex}/>
            </div>
            <div className="right-player-body">
              
              <SongCard album={currentTrack?.album} name={currentTrack?.name}/>
                <AudioPlayer currentTrack={currentTrack} total={tracks} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />  
            </div>
            </div>
          ):(<div className='notrack'>
            NO PLAYLIST IS ADDED TO PLAYER
          </div>)
        }
      </>
  )
}

export default Player