import React, { useEffect, useRef, useState } from 'react'
import './trending.css'
import ScrollContainer from 'react-indiana-drag-scroll'
import TrendingCard from './trendingCard'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../spotify';
function TrendingScroll({name_category,id}) {
    let index1 = useRef(0);
    const [playLists, setPlayLists] = useState(null);
    const navigate = useNavigate();

    const playPlaylist= (id)=>{
    navigate('/player',{state:{id:id}})
    }

    useEffect(()=>{
        apiClient.get(`browse/categories/${id}/playlists`).then(function(response){
        setPlayLists(response.data.playlists.items);
        index1.current = response.data.playlists.total;
        })
    },[id])

    getComputedStyle(document.documentElement).getPropertyValue('--gridcol')
    document.documentElement.style.setProperty('--gridcol',`repeat(${index1.current},230px)`)

    return (
    <div className="featured-body">
        <div className="trending-title">{name_category}</div>
        <ScrollContainer className='library-body1'>
            {playLists?.map((playLists,index)=>(
                <div 
                    key={index}
                    onClick={()=>{playPlaylist(playLists?.id,playLists?.name)}}>
                    <TrendingCard 
                        name={playLists?.name} 
                        image={playLists?.images[0].url} 
                        track={playLists?.tracks.total}
                    />
                </div>
            ))}
        </ScrollContainer>
      </div>
  )
}

export default TrendingScroll