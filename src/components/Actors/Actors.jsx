import React, { useState } from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';
import { Movie as MovieIcon, ArrowBack } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { useGetActorQuery } from '../../services/TMDB';
import useStyles from './styles';
import { useGetActorRecommendationsQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

export default function Actors() {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery(id);
  let classes = useStyles();
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetActorRecommendationsQuery({ id, page });

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem' color='error' />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>something has gone wrong go back</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid
        item
        sm={12}
        lg={4}
        style={{ display: 'flex', marginBottom: '1rem' }}
      >
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
        />
      </Grid>
      <Grid item direction='column' lg={7} className={classes.text}>
        <Typography
          variant='h2'
          style={{ marginBottom: '1rem' }}
          className={classes.textDirection}
        >
          {data?.name}
        </Typography>
        <Typography className={classes.textDirection} variant='h5'>
          Born:{data?.birthday}
        </Typography>
        <Typography
          className={classes.textDirection}
          style={{
            fontSize: '16px',
            textAlign: 'justify',
          }}
        >
          Born:{data?.biography}
        </Typography>
        <ButtonGroup style={{ marginTop: '1rem' }}>
          <Button
            target='_blank'
            rel='noopener noreferrer'
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
            endIcon={<MovieIcon />}
          >
            IMDB
          </Button>
          <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
            <Typography
              component={Link}
              to='/'
              color='inherit'
              variant='subtitle2'
              style={{ textDecoration: 'none' }}
            >
              BACK
            </Typography>
          </Button>
        </ButtonGroup>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          Movies
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations?.results} numberOfMovies={12} />
        ) : (
          <Box>sorry nothing was found</Box>
        )}
      </Box>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={recommendations?.total_pages}
      />
    </Grid>
  );
}
