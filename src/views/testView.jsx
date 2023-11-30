import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function TestView(props) {
  const spacing = '20px'; // Adjust the spacing as needed


  function handleAPICall(){
    props.stationTable();
  }


  return (
    <Box display="flex">
      <Button variant="contained" style={{ marginRight: spacing }}>
        Add Route
      </Button>
      <Button variant="contained">Settings</Button>
      <Button onClick={handleAPICall} variant="contained">Hämta API test</Button>
    </Box>
  );
}

export default TestView;
