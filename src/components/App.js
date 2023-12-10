import React from 'react';
import { Router } from '@reach/router';

import Header from './elements/Header';
import Home from './Home';
import Movie from './Movie';
import Search from './Search';
import NotFound from './NotFound';
// import Details from './Details';
import { GlobalStyle } from './styles/GlobalStyle';
import Login from './Login';
import Profile from './Profile';

const App = () => (
  <>
    <Header />
    <Router>
      <Login path="/login" />
      <Home path="/" />
      <Profile path="/profile" />
      <Movie path="/details/:movieId" />
      <Search path="/search"/>
      {/* <Movie path="/:movieId" /> */}
      <NotFound default />      
    </Router>
    <GlobalStyle />
  </>
)

export default App;