import React from 'react';
import { Link } from 'react-router-dom';

const Settings = (props) => {
  return(
    <div id='settings' 
    className={props.hideHamburger ? 'mobile-hide' : ''}
    onClick={props.hideMenu}> 
      <Link to='/profile'>Profile</Link>
      <Link to='/logout'>Log Out</Link>
    </div>
  )
}

export default Settings;