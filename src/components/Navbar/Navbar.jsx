import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import SearchComponent from '../SearchComponent/SearchComponent'; // Import SearchComponent

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt='' className='logo' /></Link>
      
      <ul className='navbar-menu'> 
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>   
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
      </ul>

      <div className='navbar-right'>
        {/* Tích hợp SearchComponent */}
        <SearchComponent />

        <div className='navbar-cart'>
          <Link to='/cart'><img src={assets.basket_icon} alt='' /></Link>        
          <div className={getTotalCartAmount() === 0 ? '' : "dot"}></div>
        </div>

        {
          !token ? (
            <button style={{width:'25% '}} onClick={() => setShowLogin(true)}>sign in</button>
          ) : (
            <div className='nav-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Profile</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
