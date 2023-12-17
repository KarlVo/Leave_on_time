import {observer} from 'mobx-react-lite';
import Route from '/src/presenters/routePresenter';

import React from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import PlaceIcon from '@mui/icons-material/Place';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default observer (
    function LocationView(props) {
        React.useEffect(() => {
            const interval = setInterval(() => {
                console.log('This function will be called every minute, this will trigger a -1 reduction on all timers.');
            }, 60000);
        
            return () => clearInterval(interval);
        }, []);

        let newLocationName = '';

        function newLocationNameACB(evt) {
            newLocationName = evt.target.value;
        }

        const [renameLocationForm, setRenameLocationOpen] = React.useState(false);

        const renameLocationOpen = () => {
            setRenameLocationOpen(true);
        };
        
        const renameLocationClose = () => {
            setRenameLocationOpen(false);
        };

        function renameLocationACB() {
            if (newLocationName !== '') {
                props.renameLocation(newLocationName);
            }
            renameLocationClose();
        }

        const [removeLocationForm, setRemoveLocationOpen] = React.useState(false);

        const removeLocationOpen = () => {
            setRemoveLocationOpen(true);
        };
        
        const removeLocationClose = () => {
            setRemoveLocationOpen(false);
        };

        function removeLocationACB() {
            props.removeLocation(parseInt(props.location.id));
            removeLocationClose();
        }

        function addRouteACB(evt) {
            window.location.hash='addroute';
        }

        function renderRoutesCB(route) {
            props.getRoutes(route.fromID, route.toID, route.stationDistance, route.getRoutesPromiseState);

            return (
                <Route key={route.id} route={route} />
            );
        }

        return (
            <Grid xs={true}>
                <Paper elevation={3} className='mainContent'>
                    <Grid container>
                        <Grid xs={true}>
                            <Box className='pageHead'>
                                <Breadcrumbs aria-label='breadcrumb'>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' variant='outlined' icon={<PlaceIcon />} label={props.location.name} /></Typography>
                                </Breadcrumbs>
                            </Box>
                        </Grid>
                        <Grid xs={'auto'}>
                            <Box className='pageHead'>
                                <Stack direction='row' spacing={1}>
                                    <Chip label='Rename Location' className='navItem' deleteIcon={<EditIcon />} onClick={renameLocationOpen} onDelete={renameLocationOpen} />
                                    <Chip label='Delete Location' className='navItem' variant='outlined' disabled={props.lastLocation} deleteIcon={<DeleteIcon />} onClick={removeLocationOpen} onDelete={removeLocationOpen} color='error' />
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={'40px'} sx={{padding: '40px'}}>

                        {props.location.routes.length ? props.location.routes.map(renderRoutesCB) : <div></div>}

                        <Grid xs={4}>
                            <Paper elevation={0} className='addBlock'>
                                <Button onClick={addRouteACB} variant='outlined' size='large' startIcon={<AddCircleOutlineIcon />} sx={{backgroundColor: 'aliceblue'}} fullWidth>Add Route</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>

                <Dialog open={renameLocationForm} onClose={renameLocationClose} maxWidth='sm' fullWidth={true}>
                    <DialogTitle>Rename Location</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Location Name'
                            type='text'
                            placeholder={props.location.name}
                            onChange={newLocationNameACB}
                            fullWidth
                            variant='standard'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={renameLocationACB}>Save</Button>
                        <Button onClick={renameLocationClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={removeLocationForm}
                    onClose={removeLocationClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    maxWidth='sm'
                    fullWidth={true}
                >
                    <DialogTitle id='alert-dialog-title'>{'Warning: Are you sure you want to delete this location?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>If you delete this location you will delete all of the associated routes that you have created within this location.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='error' onClick={removeLocationACB}>Delete</Button>
                        <Button onClick={removeLocationClose} autoFocus>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
);