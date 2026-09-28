import React, { useEffect, useState } from 'react';
import "./Rec.css"

import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Rec = ({categoryId}) => {

  const [apiData,setApiData] = useState([]);

  const fetchData = async ()=>{

    const relatedVideo_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&chart=mostPopular&maxResults=20&videoCategoryId=${categoryId}&key=${API_KEY}`

    const response = await fetch(relatedVideo_url);
    const data = await response.json();


    setApiData(data.items);
  }


  useEffect(()=>{
    fetchData();
  },[])


  return (
    <div className="recommended">
      {
        apiData.map((item,index)=>{
          return(
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side__video">
              <img className="rec__thumbnail"src={item.snippet.thumbnails.medium.url} alt="" />
              <div className="info">
                <h4 className="rec__title">{item.snippet.title}</h4>
                <p className="rec__name">{item.snippet.channelTitle}</p>
                <p className="rec__views">{value_converter(item.statistics.viewCount)} Views</p>
              </div>
            </Link>
          )
        })
      }
    </div>
  );
}

export default Rec;