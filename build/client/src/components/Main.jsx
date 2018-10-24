import React from 'react';

import {Switch, Route} from 'react-router-dom';

import Login from './authentication/Login.jsx';
import Settings from './authentication/Settings.jsx';

import MovieList from './movies/MovieList.jsx';

const Main = (props) => {
  return(
    <div id='main'> 
      <Switch>
        <Route exact path='/' render={()=>
              props.isLoggedIn ? <MovieList /> : <Login userLogin={props.userLogin} response={props.response}/>}
        />
        <Route exact path='/settings' render={()=>
              props.isLoggedIn ? <Settings /> : <Login userLogin={props.userLogin} response={props.response}/>}
        />
      </Switch>
    </div>
  )
}

export default Main;