// Sidebar.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Import from @mui/material/styles
import useStyles from './styles'; // Import your styles
import light from '../../assets/light.jpg';
import dark from '../../assets/dark.jpg';
import { useGetGenresQuery } from '../../services/TMDB';
import {
  Divider,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CircularProgress,
} from '@mui/material';
import genreIcons from '../../assets/genres';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreORCategory } from '../../features/currentGenreOrCategory';
const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function Sidebar({ setMobileOpen }) {
  const { data, isFetching } = useGetGenresQuery();

  const theme = useTheme();
  const classes = useStyles(); // Get the classes object from styles
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);
  return (
    <>
      <Link to='/' className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? light : dark}
          alt='logo'
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to='/'>
            <ListItem
              onClick={() => dispatch(selectGenreORCategory(value))}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>

              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <ListSubheader>Genres</ListSubheader>
      {isFetching ? (
        <Box display='flex' justifyContent='center'>
          <CircularProgress size='4rem' color='error' />
        </Box>
      ) : (
        data.genres.map(({ name, id }) => (
          <Link key={name} className={classes.links} to='/'>
            <ListItem
              button
              onClick={() => dispatch(selectGenreORCategory(id))}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[name.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))
      )}
    </>
  );
}

export default Sidebar;
