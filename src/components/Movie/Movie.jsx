import React from 'react';
import { Typography, Grid, Tooltip, Rating } from '@mui/material';
import Grow from '@mui/material/Grow';
import { Link } from 'react-router-dom';
import useStyles from './styles';
function Movie({ movie, i }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className={classes.movie}>
      <Grow in={true} key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            alt={movie.title}
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://c8.alamy.com/comp/2G8BC86/unhappy-kawaii-bunny-and-duckling-with-red-heart-inscription-im-sorry-cute-little-duck-and-rabbit-apologize-vector-illustration-eps8-2G8BC86.jpg'
            }
          />
          <Typography className={classes.title} variant='h5'>
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average / 2} / 5`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
