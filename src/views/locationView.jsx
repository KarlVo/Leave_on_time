import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function LocationView(props) {
    return (
        <div>
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
            <Box alignItems="stretch">
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={4}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                Odenplan
                                </Typography>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Buss 4 towards Radiohuset
                                </Typography>
                                <Typography variant="body2">
                                Leave in 4 minutes
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit Route</Button>
                                <Button color="error" size="small">Delete Route</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                Odenplan
                                </Typography>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Buss 4 towards Radiohuset
                                </Typography>
                                <Typography variant="body2">
                                Leave in 4 minutes
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit Route</Button>
                                <Button color="error" size="small">Delete Route</Button>
                            </CardActions>
                        </Card>

                        <Card className='addRoute' sx={{ minWidth: 275 }}>
                            <CardActionArea className='actionArea' onClick={openAddRouteACB} value={props.location.id}>
                                <CardContent className='cardContent'><AddIcon /><br></br>Add Route</CardContent>
                            </CardActionArea>
                        </Card>
                </Stack>
            </Box>
        </div>
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