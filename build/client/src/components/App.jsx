import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import { instanceOf } from 'prop-types';
import { withCookies } from 'react-cookie';
import Cookies from 'universal-cookie'

import Login from './authentication/Login.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';

import menuOptions from './../../../database/data.json';

class App extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
      super(props);
      this.state = {
          modalIsOpen: false,
          isLoggedIn:  typeof this.props.cookies.get('movieLoggedIn') != 'undefined' || false,
          first_name: this.props.cookies.get('first_name') || '',
          response: {
            message: '',
            status: 0
          },
          top: 0,
          left: 0,
          height: 130,
          width: 130,
          visible: false
      }
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.userRegister = this.userRegister.bind(this);
      this.userLogin = this.userLogin.bind(this);
      this.userLogout = this.userLogout.bind(this);

      this._handleClickRight = this._handleClickRight.bind(this);
      this._handleClickLeft = this._handleClickLeft.bind(this);
      this._setPosition = this._setPosition.bind(this);
      this.coords = React.createRef();
      this._buildMenu = this._buildMenu.bind(this);
    }

    componentDidMount(){
      this._buildMenu();
      window.addEventListener('contextmenu', this._handleClickRight);
      window.addEventListener('click', this._handleClickLeft);
    }
    componentDidUnmount(){
      window.removeEventListener('contextmenu', this._handleClickRight);
      window.removeEventListener('click', this._handleClickLeft);
      
    }
    _buildMenu(){
      let menuBuild = ``;

      const recurseSubmenu = (arr)=>{
        if(arr.length === 1){
          menuBuild += `<li><a href='#${arr[0].id}'>${arr[0].title}</a></li>`;
          return false;
        } else {
          menuBuild += `<li class='dropdown'>`;
            menuBuild += `<a href='#${arr[0].id}'>${arr[0].title} &rarr;</a>`;
            menuBuild += `<ul class='submenu'>`;
              recurseSubmenu(arr.slice(1, arr.length));
            menuBuild += `</ul>`;
          menuBuild += `</li>`
        }
      }

      Object.keys(menuOptions).forEach((key)=>{
        recurseSubmenu(menuOptions[key]);
      });
      this.coords.current.innerHTML = menuBuild;
     
      this.setState({
        height: Object.keys(menuOptions).length * 21
      });
    }
    _setPosition(){
      let menuAttr = this.coords.current.style;

      menuAttr.top = this.state.top;
      menuAttr.left = this.state.left;
      menuAttr.display = 'block';
    }
    _handleClickRight(e){
      e.preventDefault();
      this.setState({
        top: e.pageY,
        left: e.pageX,
        visible: true
      }, this._setPosition);
    }
    _handleClickLeft(e){
      const widthOutOfBounds = e.pageX < this.state.left || e.pageX > this.state.left + this.state.width;

      const heightOutOfBounds = e.pageY < this.state.top || e.pageY > this.state.top + this.state.height;

      if(widthOutOfBounds || heightOutOfBounds){
        this.coords.current.style.display = 'none';
      }
    }
    handleInput(){
      this.props.userLogin();
    }
  
    openModal() {
      this.setState({modalIsOpen: true});
    }
  
    closeModal() {
      this.setState({modalIsOpen: false});
    }

    userRegister(credentials){
      //verify with server first than set

      axios.post('/register', credentials)
      .then( (results) => {
        if(results.data.token){
          //set cookies
          this.props.cookies.set('movieLoggedIn', results.data.token, {
            path: '/',
            expires: new Date(Date.now() + 86400000)
          });
          this.closeModal();
          this.setState({
            first_name: results.data.first_name,
            isLoggedIn: true,
            response: {
              message: results.data.message,
              status: results.data.status
            }
          });

        } else {
          //no a valid login
        }
      })
      .catch( (err) => {
        console.log('error', err.response);
        this.setState({
          response: {
            message: err.response.data.message,
            status: err.response.data.status
          }
        })
      })
    }

    userLogin(credentials){
      //verify with server first than set
      axios.post('/login', credentials)
      .then( (results) => {
        if(results.data.token){
          //set cookies
          this.props.cookies.set('movieLoggedIn', results.data.token, {
            path: '/',
            expires: new Date(Date.now() + 86400000),
          });
          this.props.cookies.set('first_name', results.data.first_name, {
            path: '/',
            expires: new Date(Date.now() + 86400000),
          });
          this.closeModal();
          //console.log('set first name', JSON.stringify(results.data.first_name));
          this.setState({
            first_name: results.data.first_name,
            isLoggedIn: true,
            response: {
              message: results.data.message,
              status: results.data.status
            }
          });

        } else {
          //no a valid login
        }
      })
      .catch( (err) => {
        console.log('error', err.response);
        this.setState({
          response: {
            message: err.response.data.message,
            status: err.response.data.status
          }
        })
      })
    }

    userLogout(){
      //verify with server first than set
      this.props.cookies.remove('movieLoggedIn');
      this.props.cookies.remove('first_name');
      this.setState({
        first_name: '',
        isLoggedIn: false
      }) 
    }

    render() {
        return(
            <div id='spa'>
              <ul className='menu' ref={this.coords}>
              </ul>
              <Header 
                cookies={this.props.cookies} 
                openModal={this.openModal} 
                afterOpenModal={this.afterOpenModal} 
                closeModal={this.closeModal}
                isLoggedIn={this.state.isLoggedIn}
                userLogin={this.userLogin}
                userLogout={this.userLogout}
                userRegister={this.userRegister}
                first_name={this.state.first_name}
              />
              <Main 
                isLoggedIn={this.state.isLoggedIn} 
                cookies={this.props.cookies} 
                userRegister={this.userRegister}
                userLogin={this.userLogin}
                userLogout={this.userLogout}
                response={this.state.response}
              />
              <Footer />
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}> 
               <button onClick={this.closeModal}>Close</button>
               <Login 
               userLogin={this.userLogin} 
               response={this.state.response} 
               userRegister={this.userRegister}/>
              </Modal>
            </div>
        )
    }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('app'));

export default withCookies(App);