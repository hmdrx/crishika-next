import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box height={'100%'} sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress color="success" />
    </Box>
  );
};

export default Loading;
