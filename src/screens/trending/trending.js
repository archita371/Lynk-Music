import React, {useEffect, useState} from 'react'
import apiClient from '../../spotify';
import './trending.css'
import TrendingScroll from './trendingScroll';
import LoadingOverlay from 'react-loading-overlay';
function Trending() {
  const [categoryItem,setCategoryItem] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  useEffect(()=>{
    
    apiClient.get('browse/categories').then((response)=>{
      setCategoryItem(response.data.categories.items);
      setIsLoading(false)
    })
  },[])
  if(isLoading)
  return (<div className='screen-container flex player'><LoadingOverlay
  active={true}
  spinner={true}
  text="Loading your content..."
></LoadingOverlay></div>)
  return (
    <div className='screen-container'>
      <div className='trending'>
      {
        categoryItem?.map((category,index)=>
        (
        <div key={index}>
          <TrendingScroll name_category={category.name} id={category.id}/>
        </div>
        ))
      }
      </div>
    </div>
    )}

export default Trending