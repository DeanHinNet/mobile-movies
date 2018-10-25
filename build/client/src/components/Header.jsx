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

  render(){
    console.log('FIRST NAME', this.props.first_name);
    console.log('logged in', this.props.isLoggedIn);
    return(
      <header>
        <div id='hamburger'>
        </div>
        <div id='logo'>
        </div>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/'>Movies</Link>
          <Link to='/'>Shows</Link>
        </nav>
        <div id='search'>
        </div>
        <div className='profile'>
          <p id='display-name'>{this.props.first_name ? 'Hello '+ this.props.first_name : ''}</p>
          {this.props.isLoggedIn ? <Settings userLogout={this.props.userLogout}/> : <a href='#' onClick={this.props.openModal}>Login</a>}
        </div>
      </header>
    )
  }
}

export default Header;