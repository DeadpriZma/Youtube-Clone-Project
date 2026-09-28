import React, { useState } from 'react';
import './Home.css'
import Sidebar from "../../components/SideBar/Sidebar.jsx"
import Feed from "../../components/Feed/Feed.jsx"

const Home = ({sidebar}) => {

  const [category,setCategory] = useState(0);

  return (
    <div>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar?"":"large__container"}`}>
        <Feed category={category}/>
      </div>
    </div>
  );
}

export default Home;