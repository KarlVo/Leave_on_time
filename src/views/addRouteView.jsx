import {observer} from 'mobx-react-lite';

import React from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import PlaceIcon from '@mui/icons-material/Place';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default observer (
    function AddRouterView(props) {
        // let searchStationsStrings = {
        //     from: '',
        //     to: '',
        // };
        let searchStationsString = '';
        let stationID = 0;

        const steps = [
            {
                label: 'Select departure location',
                description: 'Use the search field to look up the station or bus stop from which you want to travel, for example: "Odenplan".',
            },
            {
                label: 'Select destination',
                description: 'Use the search field to look up the destination which you want to travel to, for example: "Tekniska Högskolan".',
            },
            {
                label: 'Create an ad',
                description: `Try out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad extensions. If you run into any problems with your ads, find out how to tell if they're running and how to resolve approval issues.`,
            },
        ];

        const [activeStep, setActiveStep] = React.useState(0);

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        const handleReset = () => {
            setActiveStep(0);
        };

        function stepsContent(index) {
            if (index === 0) {
                return (
                    <Grid container spacing={'40px'} sx={{padding: '40px 0'}}>
                        <Grid xs={true}>
                                <TextField onInput={searchStationsStringUpdateACB} fullWidth id="outlined-basic" label="Station or Bus Stop" variant="outlined" />
                        </Grid>
                        <Grid xs={'auto'}>
                                <Button onClick={searchStationsSubmitACB} variant='outlined' sx={{paddingTop:'15px', paddingBottom: '14px'}}>Search</Button>
                        </Grid>
                        <Grid xs={12}>
                            {props.stations ? <ButtonGroup fullWidth orientation="vertical" aria-label="vertical button group">{props.stations.map(stationListACB)}</ButtonGroup> : <Box></Box>}
                        </Grid>
                    </Grid>
                );
            }

            if (index === 1) {
                return (
                    <Box>Hej2</Box>
                );
            }

            if (index === 2) {
                return (
                    <Box>Hej3</Box>
                );
            }
        }

        // function updateNewRouteACB(param, value) {
        //     props.updateNewRoute(param, value);
        //     console.log(param + ' -> ' + value);
        // }

        function searchStationsStringUpdateACB(evt) {
            searchStationsString = evt.target.value;
        }

        function searchStationsSubmitACB(evt) {
            if (searchStationsString !== '') {
                props.getStations(searchStationsString);
            }
        }

        function locationPageACB(evt) {
            window.location.hash='';
        }

        function stationListACB(station) {
            function selectStationCB() {
                console.log(station.SiteId);
                console.log(station.Name);
                handleNext();
            }

            return (
                <Button
                    fullWidth
                    variant='outlined'
                    sx={{padding: '20px 0'}}
                    key={stationID++}
                    onClick={selectStationCB}
                >
                    {station.Name}
                </Button>
            );
        }

        // function fromStationListACB(station) {
        //     const params = ['fromID', 'fromName'];
        //     stationListACB(params, station);
        // }

        // function toStationListACB(station) {
        //     const params = ['toID', 'toName'];
        //     stationListACB(params, station);
        // }

        return (
            <Grid xs={true}>
                <Paper elevation={3} className='mainContent'>
                    <Grid container>
                        <Grid xs={true}>
                            <Box className='pageHead'>
                                <Breadcrumbs aria-label='breadcrumb'>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' icon={<PlaceIcon />} onClick={locationPageACB} label={props.location.name} /></Typography>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' variant='outlined' onDelete={locationPageACB} label='ADD ROUTE' /></Typography>
                                </Breadcrumbs>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={'40px'} sx={{padding: '40px'}}>
                        <Grid xs={12}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel
                                            optional={
                                                index === 2 ? (
                                                    <Typography variant="caption">Last step</Typography>
                                                ) : null
                                            }
                                        >
                                            {step.label}
                                        </StepLabel>
                                        <StepContent>
                                            <Typography>{step.description}</Typography>
                                            {stepsContent(index)}
                                            {/* <Box sx={{ mb: 2 }}>
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNext}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                    </Button>
                                                    <Button
                                                        disabled={index === 0}
                                                        onClick={handleBack}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Back
                                                    </Button>
                                                </div>
                                            </Box> */}
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
);