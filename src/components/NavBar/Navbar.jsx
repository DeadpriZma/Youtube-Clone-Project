
import "./Navbar.css"
import menu_icon from "../../assets/menu.png"
import logo from "../../assets/logo.png"
import search_icon from "../../assets/search.png"
import upload_icon from "../../assets/upload.png"
import more_icon from "../../assets/more.png"
import notification_icon from "../../assets/notification.png"
import profile_icon from "../../assets/jack.png"
import lightdark_icon from "../../assets/LightDarkMode.png"
import { Link } from 'react-router-dom';

const Navbar = ({setSidebar,darkmode}) => {

  function search(){
    alert("Search not implemented yet. Sorry!")
  }


  return (
    <nav className="flex-div">
      <div className="nav__left flex-div">
        <img className="menu__icon" src={menu_icon} alt="" onClick={() => setSidebar(prev=>prev === false?true:false)}/>
        <Link to="/"><img className="logo" src={logo} alt=""/></Link>
      </div> 

      <div className="nav__middle flex-div">
        <div className="search__box flex-div">
          <input type="text" placeholder="Search" />
          <a onClick={search}>
            <img src={search_icon} alt=''/>
          </a>
        </div>
        <a onClick={darkmode}>
          <img src={lightdark_icon} alt="" />
        </a>
      </div> 

      <div className="nav__right flex-div">
        <img className="changeInDark" src={upload_icon} alt="" />
        <img className="changeInDark" src={more_icon} alt="" />
        <img className="changeInDark" src={notification_icon} alt="" />
        <img src={profile_icon} className="user__icon" alt="" />
      </div>
    </nav>
  );
}

export default Navbar;