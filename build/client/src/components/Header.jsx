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
          <p id='display-name'>{this.props.name ? this.props.name : 'Mike'}</p>
          {this.props.isLoggedIn ? <Settings userLogout={this.props.userLogout}/> : <button onClick={this.props.openModal}>Login</button>}
        </div>
      </header>
    )
  }
}

export default Header;