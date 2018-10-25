import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      token: ''
    }
  }
  render(){
    return(
      <div id='settings'> 
        <Link to='/profile'>Profile</Link>
        <Link to='/logout'>Log Out</Link>
      </div>
    )
  }
}

export default Settings;