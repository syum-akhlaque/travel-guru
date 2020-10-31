import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import headerBg from '../../Images/Image/rectangle1.png';
import logo from '../../Images/Logo.png';
import SearchIcon from '@material-ui/icons/Search';
import { userContext } from '../../App';
import { handleSignOut } from '../Login/signOut';

const Header1 = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const signOut = ()=>{
        handleSignOut()
        setLoggedInUser({})
    }
    const userImg = loggedInUser.photo;
    const location = useLocation();
    const currentPath = location.pathname;
    let headerClass,navClass ; 
    if(currentPath === "/" || currentPath === "/booking" || currentPath === "/home" ){
         headerClass = 'bg-header';
         navClass = 'bg-nav'
    }
    else{
         headerClass = 'white-header';
         navClass = 'white-nav'     
    }
    
    return (
        <div style={{  
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${headerBg})`,
                    
          }} className= {headerClass}>
            <nav className= {navClass}>
                <ul>
                    <li> <Link to="/home"><img className="logo" src={logo} alt=""/> </Link>  </li>
                    <li className = 'search-bar'>
                        <SearchIcon style={{ color: '#ffffff' }}/><input  type="text"  placeholder="Search your destination.."/> 
                    </li>
                    <li> <Link to="/">News</Link></li>
                    <li> <Link to="/">Destinaton</Link></li>
                    <li> <Link  to="/">Blog</Link></li>
                    <li> <Link  to="/">Contact</Link></li>

                    { loggedInUser.isLogIn ?
                     <Link  to="/">
                       <button className= 'headerBtn' onClick = {signOut} > Sign Out</button>
                     </Link> :
                     <Link  to="/login"><button className= 'headerBtn' >Login</button></Link>}

                    { loggedInUser.isLogIn ? //user information display hare
                        <div className = 'user-details'>
                            <img src={userImg} alt=""  /> <br/>
                            <small>Welcome!!</small>
                            <p>{loggedInUser.name}</p> 
                            </div> :
                            <div></div> 
                    }                        
                </ul>
            </nav>
        </div>
    );
};

export default Header1;