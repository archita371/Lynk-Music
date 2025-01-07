import React, { useState } from 'react'
import Modal from 'react-modal';
import './list.css'
import {AiFillDelete} from 'react-icons/ai'
import {IoMdPlay} from 'react-icons/io'
import {FaPlus} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import apiClient from '../../spotify'
import { IconContext } from 'react-icons';
import AddList from './AddList';
Modal.setAppElement("#root");
function List({index,duration,name,click,image,owner_id,user_id,track_id,playlist_id,setTracks,snapshotId,MeArray,currentIndex}) {
  function deleteTrack() {
    if(user_id.current === owner_id.current){
      apiClient.delete(`/playlists/${playlist_id}/tracks`,{
      data:{
        "tracks": [
          {
            "uri": `spotify:track:${track_id}`
          }
        ],
        "snapshot_id": `${snapshotId.split('=')[0]}`
    }}).then(
        
        ()=>{
          apiClient.get("playlists/" + playlist_id + "/tracks").then(res=>{
            setTracks(res.data.items);
          })}
      )
      .catch(err=>console.log(err.response.data.error.message))
    }
    else
    alert(`You cannot remove tracks from a playlist you don't own.`)
  }
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const isIndex = currentIndex===(index-1)?"listItem isSelected":"listItem"
  const dur = duration/60000;
  return (
    <div className={isIndex} >

      <div className='flex listname' onClick={()=>click(index-1)}>
      <div className='index'>{index+"."}</div>
      <div><img src={image} alt="track" className='track-image'/></div>
      <div className='listtext'>{name}</div>
      </div>

      
      <div className="duration">
        {Math.floor(dur)}
        <span>m </span>
        {Math.floor(dur%1*60)}
        <span>s</span>
      </div>
      <div className="controls">
        <div className='_1' onClick={()=>click(index-1)}><IoMdPlay /></div>
        <div className='_3' onClick={deleteTrack}><AiFillDelete /></div>
        <div className='_4' onClick={toggleModal}><FaPlus /></div>
      </div>  

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className='flex modalHead'>
        <div className='addHead'>Add to...</div>
        <div className='closeBtn'>
        <IconContext.Provider value={{size:"30px", className:"btn-icon-1"}}>
        <AiFillCloseCircle onClick={toggleModal} />
        </IconContext.Provider>
        </div>
        </div>
        
        <div className="list69">
        {MeArray.map(array=>(
          <AddList name={array.name} id={array.id} track_id={track_id} image={array.images[0]?.url} key={index*1000}/>
        )
        )}
        </div>
        
      </Modal>
      
    </div>
  )
}

export default List