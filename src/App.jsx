import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Movies from './pages/Movies/Movies';
import { CssBaseline, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import MovieInfo from './components/MovieInfo/MovieInfo';
import Actors from './components/Actors/Actors';
import Profile from './components/Profile/Profile';
import useStyles from './components/styles';
function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path='/movie/:id' element={<MovieInfo />} />
          <Route path='/actors/:id' element={<Actors />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path={'/approved'} element={<Movies />} />
          <Route path={'/'} element={<Movies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
