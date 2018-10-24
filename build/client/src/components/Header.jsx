import React from 'react';
import Settings from './authentication/Settings.jsx';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: []
    }
  }

  showModal(){

  }
  render(){
    return(
      <div id='header'>
      HEADER 
        <div id='logo'>
        </div>
        <nav>
          <Link to='/'>Movies</Link>
        </nav>
        <div className='search'>
        </div>
        <div className='profile'>
          {this.props.isLoggedIn ? <Settings userLogout={this.props.userLogout}/> : <button onClick={this.props.openModal}>Login</button>}
        </div>
      </div>
    )
  }
}

export default Header;