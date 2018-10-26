import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './authentication/Login.jsx';
import Logout from './authentication/Logout.jsx';
import Settings from './authentication/Settings.jsx';
import Profile from './authentication/Profile.jsx';
import MovieList from './movies/MovieList.jsx';

const Main = (props) => {
  return(
    <div id='main'> 
      <Switch>
        <Route exact path='/' render={()=>
              props.isLoggedIn ? <MovieList /> : <Login userLogin={props.userLogin} response={props.response} userRegister={props.userRegister}/>}
        />
        <Route exact path='/settings' render={()=>
              props.isLoggedIn ? <Settings /> : <Login userLogin={props.userLogin} response={props.response} userRegister={props.userRegister}/>}
        />
        <Route exact path='/profile' render={()=>
              props.isLoggedIn ? <Profile /> : <Login userLogin={props.userLogin} response={props.response} userRegister={props.userRegister}/>}
        />  
        <Route exact path='/logout' render={()=>
              <Logout userLogout={props.userLogout}/>}
        />
      </Switch>
    </div>
  )
}

export default Main;