import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/Home.jsx"
import Video from "./pages/Video/Video.jsx"

import Navbar from './components/NavBar/Navbar.jsx';


function App() {

  const [sidebar,setSidebar] = useState(true);

  const [darkMode,setDarkMode] = useState(false);
  
  function darkmode(){
    setDarkMode(prev=>!prev);
  }
  

  return (
    <div className={darkMode?"darkmode":""}>
      <Navbar setSidebar={setSidebar} darkmode={darkmode}/>
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar}/>} />
          <Route path="/video/:categoryId/:id" element={<Video />} />
        </Routes>
    </div>
  )
}

export default App
