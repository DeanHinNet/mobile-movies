import React from 'react';
import Settings from './authentication/Settings.jsx';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hideHamburger: true,
      item: []
    }
    this.toggleHamburger = this.toggleHamburger.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.openModalHideMenu = this.openModalHideMenu.bind(this);
  }

  toggleHamburger(){
    this.setState(prevState => ({
      hideHamburger: !prevState.hideHamburger
    }));
  }

  hideMenu(){
    this.setState({ hideHamburger: true })
  }

  openModalHideMenu(){
    //When enabled, closes hamburger menu and opens modal.
    this.setState({
      hideHamburger: true
    }, ()=>{
      this.props.openModal();
    })
  }

  render(){
    return(
      <header>
        <div id='logo'></div>
        <div id='hamburger' onClick={this.toggleHamburger}></div>
        <nav 
          className={this.state.hideHamburger ? 'mobile-hide' : ''} 
          onClick={this.hideMenu}>
          <Link to='/'>Home</Link>
          <Link to='/'>Movies</Link>
          <Link to='/'>Shows</Link>
        </nav>
        <div id='search'></div>
        <div className='profile mobile-hide'>
          <p id='display-name'>
            {this.props.first_name ? 'Hello '+ this.props.first_name : ''}
          </p>
          {this.props.isLoggedIn ? 
          <Settings 
            hideHamburger={this.state.hideHamburger} 
            hideMenu={this.hideMenu} 
            userLogout={this.props.userLogout}/> : 
          <a href='#' onClick={this.openModalHideMenu} className={this.state.hideHamburger ? 'mobile-hide' : ''} >Login</a>}
        </div>
      </header>
    )
  }
}

export default Header;