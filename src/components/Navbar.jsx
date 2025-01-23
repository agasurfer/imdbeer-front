import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    
    <div className="navbar">
        <div className="logo">
            <img src="/logo.jpg" alt="Logo"  />
        </div>
        <div className="navlinks">
            <Link className='navlink' to="/" >Home</Link>
            <Link className='navlink' to="/categories" >Categories</Link>
            <Link className='navlink' to="/quiz" >Quiz</Link>

        </div>

    </div>
    
    
  )
}

export default Navbar