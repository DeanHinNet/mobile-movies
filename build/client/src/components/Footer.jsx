import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (prop) => {
  return(
    <div id='footer'>
      <div id='sitemap'>
        <Link to='/about'>About Us</Link>
        <Link to='/about'>Privacy Policy</Link>
        <Link to='/about'>Board</Link>
        <Link to='/about'>Terms of Service</Link>
        <Link to='/about'>Contact Us</Link>
        <div id='social'>
        </div>
      </div>
     
      <div id='copyright'>
        <p>&copy; 2018 Dean Hin Enterprises LLC. ALL RIGHTS RESERVED | Powered by </p>
        <a target="_blank" href="http://www.viewlift.com/">
        Powered by<img src="/assets/pics/viewlift-logo.7c315f87.png" alt="ViewLift"/></a>
      </div>
    </div>
  )
}

export default Footer;