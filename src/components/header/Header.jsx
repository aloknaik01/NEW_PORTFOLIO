import { useState } from 'react';
import './Header.css'
import { FaGithub , FaLinkedinIn } from 'react-icons/fa';
export default function Header ()
{

     const [activeLink, setActiveLink] = useState(0);
  
  const navItems = [
    { name: 'Home', icon: '✦' },
    { name: 'Work Shop', icon: null },
    { name: "Who It's For", icon: null },
    { name: 'Join Now', icon: null }
  ];
    return (
        <header>
             {/* Glass Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo headline">ALOK.DEV</div>
          <div className="nav-links ">
            <div 
              className="nav-link-bg"
              style={{
                left: `${activeLink * 25}%`,
                width: '25%',
                height: '100%',
                top: 0
              }}
            />
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`nav-link  ${activeLink === index ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(index);
                }}
              >
                {item.icon && <span style={{ marginRight: '6px', fontSize: '10px' }}>{item.icon}</span>}
                {item.name}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button className="icon-btn"><FaGithub  size={23}/></button>
            <button className="icon-btn"><FaLinkedinIn size={25} /></button>
            <button className="launch-btn ">Download Resume</button>
          </div>
        </div>
      </nav>
        </header>
    )
}