import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (prop) => {
  return(
    <div id='footer'>
      <div id='sitemap'>
        <Link to='/'>About Us</Link>
        <Link to='/'>Privacy Policy</Link>
        <Link to='/'>Board</Link>
        <Link to='/'></Link>
        <Link to='/'></Link>

      </div>
      <div id='social'></div>
      <div id='copyright'></div>
    </div>
  )
}

export default Footer;