import React from 'react';
import '../index.css';
import po from './po.jpg';
import {NavLink} from 'react-router-dom';

function Landing() {
    const divStyle = {
        backgroundImage: `url(${po})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh' // Set the height as needed
      };
    
  return (
    <div style={divStyle}>
        <div className="content">
            <h1>UMESH JOSHI</h1>
        </div>
        <div className="content1">
            <h3>Developer</h3>
        </div>
        <div>
        <button 
        onClick={() => window.location.href='https://www.linkedin.com/in/umeshjoshi22/'}
        className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-black py-2 px-4 border-transparent hover:border-transparent rounded content2">
            About Me
        </button>
        <button>
            <NavLink 
            to={'/Board'}
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-black py-2 px-4 border-transparent hover:border-transparent rounded content3">
            Projects
            </NavLink>
        </button>
        </div>
    </div>
  )
}

export default Landing