// rfce
import React, { useContext } from 'react';
import Logo from "../logo.png";
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext';

function NavBar() {

    const {logout} = useContext(AuthContext);

    const logoutUser = () =>{
        logout();
    }
    return <>
        <div className
        ="border 
        pl-12 py-4 space-x-8
         flex  items-center 
        ">
            <img className="w-[50px] md:w-[60px]" src={Logo}></img>
            <Link to="/" className=
            {`text-blue-400 
            font-bold 
            text-xl
            md:text-3xl`}>Movies</Link>
            <Link to="/favourites" className="text-blue-400 font-bold text-xl md:text-3xl">Favourites</Link>
            <div onClick={logoutUser} className="text-blue-400 font-bold text-xl md:text-3xl">Logout</div>

        </div>
    </>;
}

export default NavBar;
