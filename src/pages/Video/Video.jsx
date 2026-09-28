import React from 'react';
import "./Video.css"

import PlayVideo from "../../components/PlayVideo/PlayVideo"
import Rec from '../../components/Recommended/Rec';
import { useParams } from 'react-router-dom';

const Video = () => {

  const {id,categoryId} = useParams();
  return (
    <div className="play__container">
      <PlayVideo id={id} categoryId={categoryId}/>
      <Rec categoryId={categoryId}/>
    </div>
  );
}

export default Video;