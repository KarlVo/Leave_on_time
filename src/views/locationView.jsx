import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

function LocationView(props) {
    return (
        <Box>
            <Typography variant="h4" component="h1">
                {props.location.name}
            </Typography>
            <Button  variant="contained" startIcon={<AddIcon />} onClick={openAddRouteACB} value={props.location.id}>
                Add Route
            </Button>
            <Button disabled={props.lastLocation} color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={removeLocationACB} value={props.location.id}>
                Delete
            </Button>
        </Box>
    );

    function removeLocationACB(evt) {
        props.removeLocation(parseInt(evt.target.value));
    }
    function openAddRouteACB() {
       
        console.log("openAddRouteACB");
        window.location.hash="#/addroute";
    }
}

export default LocationView;