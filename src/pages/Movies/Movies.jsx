import React from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../../components/MovieList/MovieList';
import { selectGenreORCategory } from '../../features/currentGenreOrCategory';
import { useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import FeaturedMovie from '../../components/FeaturedMovie/FeaturedMovie';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  return (
    <div>
      {isFetching ? (
        <Box display='flex' justifyContent='center'>
          <CircularProgress size='4rem' color='error' />
        </Box>
      ) : (
        <div>
          <FeaturedMovie movie={data?.results[0]} />
          <MovieList movies={data.results} numberOfMovies={17} excludeFirst />
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.total_pages}
          />
        </div>
      )}
    </div>
  );
}

export default Movies;
