import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function TestView(props) {
  const spacing = '16px'; // Adjust the spacing as needed

  return (
    <Box display="flex">
      <Button variant="contained" style={{ marginRight: spacing }}>
        Add Route
      </Button>
      <Button variant="contained">Settings</Button>
    </Box>
  );
}

export default TestView;
