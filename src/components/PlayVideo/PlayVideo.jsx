import React, { useEffect, useState } from 'react';
import "./PlayVideo.css"


import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import share from "../../assets/share.png"
import save from "../../assets/save.png"
import user_profile from "../../assets/user_profile.jpg"
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {

  const {id} = useParams();

  const [apiData,setApiData] = useState(null);

  const fetchVideoData = async ()=>{
    //Fetching videos data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${API_KEY}`;
    await fetch(videoDetails_url).then(response=>response.json()).then(data => setApiData(data.items[0]));
  }

  useEffect(()=>{
    fetchVideoData();
  },[id]
  )

  const [channelData,setChannelData] = useState(null);
  const [commentData,setCommentData] = useState([]);

  const fetchOtherData = async ()=>{
    //Fetching Channel data
    const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=contentDetails&part=statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    await fetch(channelDetails_url).then(response=>response.json()).then(data => setChannelData(data.items[0]));


    //Fetching Comments data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${id}&key=${API_KEY}`;
    const response = await fetch(comment_url);
    const data = await response.json();

    if (!response.ok) {
      setCommentData([]);
      return;
    }

    setCommentData(data.items || []);
  }


  useEffect(() => {
  if (apiData) {
    fetchOtherData();
  }
  }, [apiData]);



  return (
    <div className={'play__video darkmode?"darkmode":""'}>
      {/*<video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
      <h3>{apiData?apiData.snippet.title:"title here"}</h3>
      <div className="play__video--info">
        <p>{apiData?value_converter(apiData.statistics.viewCount):"15K"} Views &bull; {apiData?(moment(apiData.snippet.publishedAt).fromNow()):"One day ago"}</p>
        <div className="">
          <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):"Number here"}</span>
          <span><img src={dislike} alt="" />{apiData?apiData.statistics.dislikeCount:"Number here"}</span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url || user_profile} alt="" />
        <div>
          <p>{apiData?(apiData.snippet.channelTitle):"Title here"}</p>
          <span>{channelData?value_converter(channelData.statistics.subscriberCount):"user_profile"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video__desc">
        <p>{apiData?(apiData.snippet.description):"Desc here"}</p>
        <hr />
        <h4>{apiData?value_converter(apiData.statistics.commentCount):"0"} Comments</h4>
        {commentData.map((item)=>{
          return(
            <div key={item.id} className="comment">
              <img className="comment-profile" src={item.snippet.topLevelComment.snippet.authorProfileImageUrl || user_profile} alt="" onError={(e) => { e.currentTarget.src = user_profile; }}/>
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 Day Ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay || " "}</p>
                <div className="comment__action">
                  <img className="like-dislike-comment" src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img className="like-dislike-comment" src={dislike} alt="" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  );
}

export default PlayVideo;