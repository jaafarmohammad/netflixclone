import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbKey = process.env.REACT_APP_TMDB_KEY;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: (builder) => ({
    //*get Genres.
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbKey}`,
    }),

    //*get movies by type.
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //get movies by search.
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbKey}`;
        }
        //get movies by category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbKey}`;
        }
        //get movies by genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbKey}`;
        }
        //get popular  movies.
        return `movie/popular?page=1&api_key=${tmdbKey}`;
      },
    }),
    //*Get Movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbKey}`,
    }),
    //*Get User Specific Lists.
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbKey}&session_id=${sessionId}&page=${page}`,
    }),
    //*Get User Specific List.
    getRecommendations: builder.query({
      query: ({ movieId, list }) =>
        `/movie/${movieId}/${list}?api_key=${tmdbKey}`,
    }),
    //*Get Actor Information.
    getActor: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbKey}`,
    }),
    //*Get Recommendations Base On Actor.
    getActorRecommendations: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetActorRecommendationsQuery,
  useGetListQuery,
} = tmdbApi;
