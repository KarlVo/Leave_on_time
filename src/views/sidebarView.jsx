import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

function SidebarView(props) {
    const spacing = '20px';
    var locationName = '';

    if(props.addingLocation){
        return (
            <Box>
                {props.locations.map(listLocationsCB)}
                <Paper
                    component="form"
                    sx={{ mb: '22px', p: '10px 0px', display: 'flex', alignItems: 'center', width: '100%' }}
                    elevation={3}
                >
                    <InputBase
                        autoFocus={true}
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="LOCATION NAME"
                        onChange={locationNameUpdateACB}
                        onKeyDown={onKeyDownACB}
                        onKeyUp={onKeyUpACB}
                        inputProps={{ 'aria-label': 'location name', style: { textTransform: "uppercase" } }}
                    />
                    <IconButton color="primary" onClick={addLocationACB} type="button" sx={{ p: '10px' }} aria-label="check">
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={addLocationToggleACB} sx={{ mr: 2, p: '10px' }} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Paper>
            </Box>
        );
    } else {
        return (
            <Box>
                {props.locations.map(listLocationsCB)}
                <Button onClick={addLocationToggleACB} variant="outlined" style={{ color: '#ffffff', padding: spacing, width: '100%', marginBottom: spacing }}>Add Location</Button>
            </Box>
        );
    }

    function locationNameUpdateACB(evt) {
        locationName = evt.target.value;
    }

    function addLocationACB(evt) {
        if (locationName !== '') {
            props.addLocation(locationName);
            props.addLocationToggle();
        }
    }

    function onKeyDownACB(evt) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
        }
    }

    function onKeyUpACB(evt) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            addLocationACB();
        }
        if (evt.key === 'Escape') {
            addLocationToggleACB();
        }
    }

    function addLocationToggleACB(evt) {
        props.addLocationToggle();
    }

    function setLocationACB(evt) {
        props.setLocation(parseInt(evt.target.value));
    }

    function listLocationsCB(location) {
        if (location.id === props.currentLocation) {
            return (<Button disabled key={location.id} variant="contained" style={{ color: '#0050C2', backgroundColor: '#ffffff', padding: spacing, width: '100%', marginBottom: spacing }}>{location.name}</Button>);
        } else {
            return (<Button key={location.id} value={location.id} onClick={setLocationACB} variant="contained" style={{ padding: spacing, width: '100%', marginBottom: spacing }}>{location.name}</Button>);
        }
    }
}

export default SidebarView;