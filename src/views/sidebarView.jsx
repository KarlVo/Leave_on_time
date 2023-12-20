import {observer} from 'mobx-react-lite';
import {getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';

import React from 'react';

import AddLocationIcon from '@mui/icons-material/AddLocation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default observer (
    function SidebarView(props) {

        function loginACB() {
            document.getElementById('auth').click();
        }

        let locationName = '';

        const [addLocationForm, setAddLocationFormOpen] = React.useState(false);

        const addLocationFormOpen = () => {
            setAddLocationFormOpen(true);
        }

        const addLocationFormClose = () => {
            setAddLocationFormOpen(false);
        }

        function locationNameUpdateACB(evt) {
            locationName = evt.target.value;
        }

        function addLocationACB(evt) {
            if (locationName !== '') {
                props.addLocation(locationName);
            }
            addLocationFormClose();
        }

        function setLocationACB(evt) {
            props.setLocation(parseInt(evt.target.value));
            window.location.hash='';
        }

        function locationButtonsCB(location) {
            if (location.id === props.currentLocation) {
                return (
                    <Button disabled key={location.id} value={location.id} style={{backgroundColor: '#ffffff', width: '100%', padding: '20px 0'}}>
                        {location.name}
                    </Button>
                );
            }
            return (
                <Button key={location.id} value={location.id} onClick={setLocationACB} style={{width: '100%', padding: '20px 0'}}>
                    {location.name}
                </Button>
            );
        }

        return (
            <Grid xs={'auto'} className='sidebar'>
                <Box className='sidebarCol'>
                    <Box className='top'>
                        <Typography variant='h1' component='h1' sx={{marginBottom: '40px', width: '300px', height: '100px'}}>
                            <img src='/src/img/logo.png' alt='Leave on Time' width='300px' height='100px' />
                        </Typography>
                        <Button onClick={loginACB} variant='outlined' style={{color: '#ffffff', marginBottom: '40px', width: '100%', padding: '20px 0'}}>
                            {props.user ? 'Log out' : 'Log in'}
                        </Button>
                        <ButtonGroup orientation='vertical' aria-label='vertical contained button group' variant='contained' sx={{width: '100%', margin: 0, padding: 0}}>
                            {props.locations.map(locationButtonsCB)}
                        </ButtonGroup>
                        <Button onClick={addLocationFormOpen} variant='outlined' startIcon={<AddLocationIcon />} style={{color: '#ffffff', margin: '40px 0', width: '100%', padding: '20px 0'}}>
                            Add Location
                        </Button>
                    </Box>
                    <Box className='bottom'>
                        <Typography color='white' variant='caption' component='p'>
                            Version: 0.0.2 Alpha
                        </Typography>
                        <Typography color='white' variant='caption' component='p'>
                            Copyright © 2023<br />
                            Karl Voigt, Omarabdalaziz Kanbour, &amp; Simon Lilja
                        </Typography>
                    </Box>
                </Box>

                <Dialog open={addLocationForm} onClose={addLocationFormClose} maxWidth='sm' fullWidth={true}>
                    <DialogTitle>Creat New Location</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Location Name'
                            type='text'
                            placeholder='Enter Name of Location'
                            fullWidth
                            variant='standard'
                            onChange={locationNameUpdateACB}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={addLocationACB}>Save</Button>
                        <Button onClick={addLocationFormClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
);