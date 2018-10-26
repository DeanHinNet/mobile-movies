import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  props.userLogout();    
  return <Redirect to="/" />;
}

export default Logout;
