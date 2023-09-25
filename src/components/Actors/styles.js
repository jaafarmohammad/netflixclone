import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material';
const theme = createTheme();
export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  poster: {
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64,64,70)',
    height: '500px',
    width: '80%',

    [theme.breakpoints.down('lg')]: {
      margin: '0 auto',
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
  },
  textDirection: {
    textAlign: 'start',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));
