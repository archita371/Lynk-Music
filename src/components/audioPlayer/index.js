import React, { useEffect, useRef, useState } from 'react'
import './audioPlayer.css'
import ProgressBar from './progressBar'
import Controls from './controls'
function AudioPlayer({setCurrentIndex,currentIndex,total}) {
    const [isPlaying,setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    var audioSrc = total[currentIndex]?.track.preview_url;
    const audioRef = useRef(new Audio(total[0]?.track.preview_url))
    
    const intervalRef = useRef();
    const isReady = useRef(false);
    const {duration} = audioRef.current;
    const currentPercentage = duration? (trackProgress / duration) *100 : 0;
    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current= setInterval(() => {
           if(audioRef.current.ended){
            handleNext();
        
           }
           else{
            setTrackProgress(audioRef.current.currentTime)
           } 
        }, [1000]);
    }
    useEffect(()=>{
        if(audioRef.current.src){
            if(isPlaying && audioRef.current){
                audioRef.current.play();
                startTimer();
            }
            else{
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
        else{
            if(isPlaying && audioRef.current){
                audioRef.current = new Audio(audioSrc);
                audioRef.current.play();
                startTimer();
            }
            else{
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
        
    },[isPlaying])

    useEffect(()=>{
        audioRef.current.pause();
        if(audioSrc === null){
            alert('The Requested Track cannot be played as no valid source is present.')
            handleNext()
        }
        else
        {
            audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);
        if(isReady.current){
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        }
        else{
            isReady.current = true;
        }
        }
        
    },[currentIndex])

    useEffect(()=>{
        if(audioSrc === null){
            alert('The Requested Track cannot be played as no valid source is present.')
            handleNext()
        }
        return ()=>{
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }

       
    },[])
    const handleNext = () => {
        
        if(currentIndex< total.length -1){
            setCurrentIndex(currentIndex+1);
            
        }
        else setCurrentIndex(0);
    }

    const handlePrev = () => {
        if(currentIndex-1 < 0) setCurrentIndex(total.length -1);
        else setCurrentIndex(currentIndex-1);
    }
  return (
    <div className='player-body'>
         <div className="player-top">
            <ProgressBar percentage={currentPercentage} isPlaying={true} size={300} color='red'/> 
        </div>
        <div className="player-bottom">
            <Controls 
                duration={Math.round(trackProgress)}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                handleNext={handleNext}
                handlePrev={handlePrev}
                total={total}
            />
        </div> 
    </div>
  )
}

export default AudioPlayer