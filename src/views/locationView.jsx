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

        function focusSwitchACB(id) {
            props.focusSwitch(id);
        }

        function addRouteACB(evt) {
            window.location.hash='addroute';
        }

        function deleteRouteACB(id) {
            props.deleteRoute(id);
        }

        function setCurrentRouteACB(id) {
            props.setCurrentRoute(id);
        }

        function renderRoutesCB(route) {
            props.setRoutesPromiseState(props.location.id, route.id);
            props.getRoutes(route.fromID, route.toID, route.stationDistance, props.getRoutesPromiseStates[props.location.id][route.id]);
            
            return (
                <Route key={route.id} route={route} locationId={props.location.id} deleteRoute={deleteRouteACB} focusSwitch={focusSwitchACB} setCurrentRoute={setCurrentRouteACB} getRoutesPromiseState={props.getRoutesPromiseStates[props.location.id][route.id]} />
            );
        }

        return (
            <Grid xs={12} md={true}>
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
                    <Grid container spacing={'40px'} sx={{padding: '40px'}} sm={{spacing: '0', padding: '0'}}>

                        {props.location.routes.length ? props.location.routes.map(renderRoutesCB) : <div></div>}

                        <Grid xs={12} lg={6} xl={4}>
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    renameLocationACB(); 
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={renameLocationClose}>Cancel</Button>
                        <Button onClick={renameLocationACB}>Save</Button>
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