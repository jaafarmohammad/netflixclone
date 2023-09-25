import React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './styles';

function Pagination({ page, setPage, totalPages }) {
  const classes = useStyles();

  const handlePrev = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleNext = (prev) => {
    if (page !== totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  if (totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        variant='contained'
        color='error'
        type='button'
        onClick={handlePrev}
      >
        prev
      </Button>
      <Typography variant='h4' className={classes.pageNumber}>
        {page}
      </Typography>
      <Button
        className={classes.button}
        variant='contained'
        color='error'
        type='button'
        onClick={handleNext}
      >
        next
      </Button>
    </div>
  );
}

export default Pagination;
