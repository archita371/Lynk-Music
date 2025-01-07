import React, { useEffect, useRef, useState } from 'react'
import './queue.css'
import List from './List'
import apiClient from '../../spotify';
import { useLocation } from 'react-router-dom';
function Queue({tracks,setCurrentIndex,setTracks,user_id,MeArray,currentIndex}) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const location = useLocation();
  const [loc,setLoc] = useState('');
  const [snapshotId,setSnapshotId] = useState('');
  let owner_id = useRef('');
  useEffect(()=>{
    apiClient.get("playlists/" + location.state?.id).then(
      (response)=>{
        owner_id.current=response.data.owner.id;
        setLoc(response.data.name)
        setSnapshotId(response.data.snapshot_id);
      }
    )
  },[location.state?.id])
  
  const onDragStart = (e, index) => { 
    
    if(owner_id.current !== user_id.current){
      alert(`Playlist can't be edited due to lack of ownership.`)
    }
    else{
      dragItem.current=index
    }

  }

  const onDragEnd = (e) => {
    if(owner_id.current === user_id.current){
      const dragOverItem_ = dragOverItem.current>dragItem.current?dragOverItem.current+1:dragOverItem.current
    apiClient.put("playlists/" + location.state?.id + "/tracks",{
      "range_start":dragItem.current,
      "insert_before":dragOverItem_
    }
    
    ).then(
    ()=>{
      apiClient.get("playlists/" + location.state?.id + "/tracks").then(res=>{
        setTracks(res.data.items);
      })
    })
    }
  }
  const onDragEnter = (e,index) => {
    if(owner_id.current === user_id.current){
    dragOverItem.current = index
  }}
  return (
    <div className='mainQueue'>
      <div>
      <div className="heading">{loc}</div>
      </div>
      
      <div className="list-track">
        {tracks?.map((track,index)=>(<div className='flex' key={index+1}
         draggable 
         onDragStart={(e)=>onDragStart(e,index)} 
         onDragEnter={(e)=>onDragEnter(e,index)}
         onDragEnd={onDragEnd}>
          <List 
            name={track?.track?.name} 
            index={index+1} 
            duration={track?.track?.duration_ms} 
            click={setCurrentIndex} 
            image={track?.track?.album?.images[2]?.url}
            owner_id={owner_id}
            user_id={user_id}
            track_id={track?.track?.id}
            playlist_id={location.state?.id}
            setTracks={setTracks}
            snapshotId={snapshotId}
            MeArray={MeArray}
            currentIndex={currentIndex}
          /></div>
        ))}
      </div> 
    </div>
  )
}

export default Queue


// onClick={()=>setCurrentIndex(index)}