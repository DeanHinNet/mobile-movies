import React from 'react';

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
        </nav>
        <div className='search'>
        </div>
        <div className='profile'>
          {this.props.isLoggedIn ? <button onClick={this.userLogout}>Welcome</button> : <button onClick={this.props.openModal}>Login</button>}
        </div>
      </div>
    )
  }
}

export default Header;