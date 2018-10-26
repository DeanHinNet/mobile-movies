import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return(
    <footer>
      <div id='sitemap'>
        <Link to='/'>About Us</Link>
        <Link to='/'>Privacy Policy</Link>
        <Link to='/'>Board</Link>
        <Link to='/'>Terms of Service</Link>
        <Link to='/'>Contact Us</Link>
        <div id='social'>
        </div>
      </div>
     
      <div id='copyright'>
        <p>&copy; 2018 Dean Hin Enterprises LLC. ALL RIGHTS RESERVED</p>
        <a target="_blank" href="http://www.viewlift.com/">
        Powered by<img src="/assets/pics/viewlift-logo.7c315f87.png" alt="ViewLift"/></a>
      </div>
    </footer>
  )
}

export default Footer;