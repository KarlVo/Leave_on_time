import {observer} from 'mobx-react-lite';
import {styled} from '@mui/material/styles';

import React from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import MuiInput from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import PlaceIcon from '@mui/icons-material/Place';
import Slider from '@mui/material/Slider';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default observer (
    function AddRouterView(props) {
        let searchStationsString = {
            from: '',
            to: ''
        };
        let stationID = 0;

        const Input = styled(MuiInput)({
            width: '42px'
        });

        const [value, setValue] = React.useState(5);

        const handleSliderChange = (evt, newValue) => {
            setValue(newValue);
        };
        
        const handleInputChange = (evt) => {
            setValue(evt.target.value === '' ? 0 : Number(evt.target.value));
        };
        
        const handleBlur = () => {
            if (value < 0) {
                setValue(0);
            } else if (value > 60) {
                setValue(60);
            }
        };

        const finalQuestion = 'How long (in minutes) does it take you to make your way from "' + props.location.name + '" to ' + props.route.fromName + '?';

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
                label: 'Estimate distance to departure location',
                description: finalQuestion,
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

        function addRouteACB(evt) {
            handleNext();
            props.updateNewRoute('stationDistance', parseInt(value));
            props.saveNewRoute();
            window.location.hash='';
        }

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
                            {props.fromStations ? <ButtonGroup fullWidth orientation="vertical" aria-label="vertical button group">{props.fromStations.map(stationListACB)}</ButtonGroup> : <Box></Box>}
                        </Grid>
                    </Grid>
                );
            }

            if (index === 1) {
                return (
                    <Grid container spacing={'40px'} sx={{padding: '40px 0'}}>
                        <Grid xs={true}>
                                <TextField onInput={searchStationsStringUpdateACB} fullWidth id="outlined-basic" label="Station or Bus Stop" variant="outlined" />
                        </Grid>
                        <Grid xs={'auto'}>
                                <Button onClick={searchStationsSubmitACB} variant='outlined' sx={{paddingTop:'15px', paddingBottom: '14px'}}>Search</Button>
                        </Grid>
                        <Grid xs={12}>
                            {props.toStations ? <ButtonGroup fullWidth orientation="vertical" aria-label="vertical button group">{props.toStations.map(stationListACB)}</ButtonGroup> : <Box></Box>}
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                );
            }

            if (index === 2) {
                return (
                    <Grid container spacing={'40px'} sx={{padding: '40px 0'}} alignItems="center">
                        <Grid xs={true}>
                            <Slider
                                value={typeof value === 'number' ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                                min={0}
                                max={20}
                            />
                        </Grid>
                        <Grid xs={'auto'}>
                            <Grid container>
                                <Grid xs={true}>
                                    <Input
                                        value={value}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                            step: 5,
                                            min: 0,
                                            max: 60,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                                <Grid xs={'auto'}>
                                    <Typography sx={{marginLeft: '10px'}}>
                                        min
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={addRouteACB}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Add Route
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                );
            }
        }

        function updateNewRouteACB(param, value) {
            props.updateNewRoute(param, value);
        }

        function searchStationsStringUpdateACB(evt) {
            if (activeStep === 0) {
                searchStationsString.from = evt.target.value;
            } else if (activeStep === 1) {
                searchStationsString.to = evt.target.value;
            }
        }

        function searchStationsSubmitACB(evt) {
            if (activeStep === 0 && searchStationsString.from !== '') {
                props.getStations(0, searchStationsString.from);
            } else if (activeStep === 1 && searchStationsString.to !== '') {
                props.getStations(1, searchStationsString.to);
            }
        }

        function locationPageACB(evt) {
            props.resetNewRoute();
            window.location.hash='';
        }

        function stationListACB(station) {
            function selectStationCB() {
                if (activeStep === 0) {
                    updateNewRouteACB('fromID', station.SiteId);
                    updateNewRouteACB('fromName', station.Name);
                } else if (activeStep === 1) {
                    updateNewRouteACB('toID', station.SiteId);
                    updateNewRouteACB('toName', station.Name);
                }
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