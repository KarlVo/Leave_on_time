import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import PlaceIcon from '@mui/icons-material/Place';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddLocationIcon from '@mui/icons-material/AddLocation';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DesignView(props) {
    const [openDelete, setDeleteOpen] = React.useState(false);

    const handleClickDeleteOpen = () => {
        setDeleteOpen(true);
    };
    
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const [openEdit, setEditOpen] = React.useState(false);

    const handleClickEditOpen = () => {
        setEditOpen(true);
    };
    
    const handleEditClose = () => {
        setEditOpen(false);
    };

    function handleClick(evt) {
        console.log('Click Handled!');
    }

    function handleDelete(evt) {
        console.log('Deleted!');
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container>
                <Grid xs={'auto'} className='sidebar'>
                    <Box className='sidebarCol'>
                        <Box className='top'>
                            <Typography variant='h1' component='h1' sx={{marginBottom: '40px', width: '300px', height: '100px'}}>
                                <img src='/src/img/logo.png' alt='Leave on Time' width='300px' height='100px' />
                            </Typography>
                            <ButtonGroup orientation='vertical' aria-label='vertical contained button group' variant='contained' sx={{width: '100%', margin: 0, padding: 0}}>
                                <Button style={{width: '100%', padding: '20px 0'}}>School</Button>
                                <Button disabled style={{backgroundColor: '#ffffff', width: '100%', padding: '20px 0'}}>Home</Button>
                                <Button style={{width: '100%', padding: '20px 0'}}>Work</Button>
                                <Button style={{width: '100%', padding: '20px 0'}}>Parrents</Button>
                            </ButtonGroup>
                            <Button variant='outlined' startIcon={<AddLocationIcon />} style={{color: '#ffffff', margin: '40px 0', width: '100%', padding: '20px 0'}}>Add Location</Button>
                        </Box>
                        <Box className='bottom'>
                            <Typography color='white' variant='caption' component='p'>Version: 0.0.2 Alpha</Typography>
                            <Typography color='white' variant='caption' component='p'>Copyright © 2023<br />Karl Voigt, Omarabdalaziz Kanbour, &amp; Simon Lilja</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={true}>
                    <Paper elevation={3} className='mainContent'>
                        <Grid container>
                            <Grid xs={true}>
                                <Box className='pageHead'>
                                    <Breadcrumbs aria-label='breadcrumb'>
                                        <Typography variant='h4' component='h2'><Chip className='navItem' icon={<PlaceIcon />} onClick={handleClick} label='HOME' /></Typography>
                                        <Typography variant='h4' component='h2'><Chip className='navItem' variant='outlined' onDelete={handleDelete} label='ADD ROUTE' /></Typography>
                                    </Breadcrumbs>
                                </Box>
                            </Grid>
                            <Grid xs={'auto'}>
                                <Box className='pageHead'>
                                    <Stack direction='row' spacing={1}>
                                        <Chip label='Rename Location' className='navItem' deleteIcon={<EditIcon />} onClick={handleClickEditOpen} onDelete={handleClickEditOpen} />
                                        <Chip label='Delete Location' className='navItem' variant='outlined' deleteIcon={<DeleteIcon />} onClick={handleClickDeleteOpen} onDelete={handleClickDeleteOpen} color='error' />
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={'40px'} sx={{padding: '40px'}}>
                            <Grid xs={4}>
                                <Paper elevation={5}>
                                    <Box className='block'>
                                        <Typography variant='button' component='h3'>Östra Station &gt; Odenplan</Typography>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container spacing={1}>
                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>2 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='6' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Karolinska institutet</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>4 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='error' size='small' variant='filled' label='67' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Odenplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>8 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>15 min</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container>
                                            <Grid xs={true}>
                                                <FormGroup>
                                                    <FormControlLabel size='small' control={<Switch defaultChecked />} label='Focus' />
                                                </FormGroup>
                                            </Grid>
                                            <Grid xs={'auto'}>
                                                <IconButton aria-label="settings">
                                                    <SettingsIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper elevation={5}>
                                    <Box className='block'>
                                        <Typography variant='button' component='h3'>Östra Station &gt; Odenplan</Typography>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container spacing={1}>
                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>2 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='6' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Karolinska institutet</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>4 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='error' size='small' variant='filled' label='67' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Odenplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>8 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>15 min</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container>
                                            <Grid xs={true}>
                                                <FormGroup>
                                                    <FormControlLabel size='small' control={<Switch defaultChecked />} label='Focus' />
                                                </FormGroup>
                                            </Grid>
                                            <Grid xs={'auto'}>
                                                <IconButton aria-label="settings">
                                                    <SettingsIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper elevation={5}>
                                    <Box className='block'>
                                        <Typography variant='button' component='h3'>Östra Station &gt; Odenplan</Typography>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container spacing={1}>
                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>2 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='6' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Karolinska institutet</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>4 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='error' size='small' variant='filled' label='67' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Odenplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>8 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>15 min</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container>
                                            <Grid xs={true}>
                                                <FormGroup>
                                                    <FormControlLabel size='small' control={<Switch defaultChecked />} label='Focus' />
                                                </FormGroup>
                                            </Grid>
                                            <Grid xs={'auto'}>
                                                <IconButton aria-label="settings">
                                                    <SettingsIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper elevation={5}>
                                    <Box className='block'>
                                        <Typography variant='button' component='h3'>Östra Station &gt; Odenplan</Typography>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container spacing={1}>
                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>2 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='6' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Karolinska institutet</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>4 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='error' size='small' variant='filled' label='67' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Odenplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>8 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>15 min</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container>
                                            <Grid xs={true}>
                                                <FormGroup>
                                                    <FormControlLabel size='small' control={<Switch defaultChecked />} label='Focus' />
                                                </FormGroup>
                                            </Grid>
                                            <Grid xs={'auto'}>
                                                <IconButton aria-label="settings">
                                                    <SettingsIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper elevation={5}>
                                    <Box className='block'>
                                        <Typography variant='button' component='h3'>Östra Station &gt; Odenplan</Typography>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container spacing={1}>
                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>2 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='6' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Karolinska institutet</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>4 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='error' size='small' variant='filled' label='67' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Odenplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>8 min</Typography></Grid>

                                            <Grid xs={1}><DirectionsBusIcon /></Grid>
                                            <Grid xs={2}><Chip color='info' size='small' variant='filled' label='4' /></Grid>
                                            <Grid xs={7}><Typography variant='body2' component='span'>Gullmarsplan</Typography></Grid>
                                            <Grid xs={2}><Typography variant='body2' component='span'>15 min</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box className='block'>
                                        <Grid container>
                                            <Grid xs={true}>
                                                <FormGroup>
                                                    <FormControlLabel size='small' control={<Switch defaultChecked />} label='Focus' />
                                                </FormGroup>
                                            </Grid>
                                            <Grid xs={'auto'}>
                                                <IconButton aria-label="settings">
                                                    <SettingsIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper elevation={0} className='addBlock'>
                                    <Button variant='outlined' size='large' startIcon={<AddCircleOutlineIcon />} sx={{backgroundColor: 'aliceblue'}} fullWidth>Add Route</Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={openDelete}
                onClose={handleDeleteClose}
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
                    <Button color='error' onClick={handleDeleteClose}>Delete</Button>
                    <Button onClick={handleDeleteClose} autoFocus>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEdit} onClose={handleEditClose} maxWidth='sm' fullWidth={true}>
                <DialogTitle>Rename Location</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Location Name'
                        type='text'
                        placeholder='Home'
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Save</Button>
                    <Button onClick={handleEditClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}