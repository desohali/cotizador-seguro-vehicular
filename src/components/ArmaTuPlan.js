
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import armaTuPlanPersona from '../assets/images/armaTuPlanPersona.svg';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const ArmaTuPlan = () => {

  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const matches = useMediaQuery('(min-width:768px)');
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const dataUser = JSON.parse(sessionStorage.getItem('userTemp') || '{}');
  const dataLogin = JSON.parse(sessionStorage.getItem('dataTemp') || '{}');

  const steps = [
    {
      label: 'Datos',
      description: '',
    },
    {
      label: 'Arma tu plan',
      description: '',
    },
  ];

  return (
    <Grid container sx={{ height: '100vh', pt: 3 }}>

      <Grid item xs={12} sm={6} lg={4}>
        <Container maxWidth='xs' sx={{ mb: 2 }}>
          <Stepper activeStep={1} orientation={matches ? "vertical" : "horizontal"}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption"></Typography>
                    ) : null
                  }
                >
                  <Typography align='left' component="div" variant="small" color='Gray'>
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        {matches && (
          <Typography align='left' component="div" variant="small" color='Gray'>
            <IconButton onClick={() => navigate('/')}>
              <ArrowBackIcon />
            </IconButton>
            VOLVER
          </Typography>
        )}
        <Container maxWidth='xs'>

          <Typography align='left' component="div" variant="h5" color='Gray'>
            ¡HOLA <span style={{ color: '#d32f2f' }}>{dataUser?.name?.toUpperCase()}</span>!
          </Typography>
          <Typography align='left' component="div" variant="small" color='Gray'>
            <small>Conoce las coberturas para tu plan</small>
          </Typography>

          <Grid container sx={{ boxShadow: 3, borderRadius: 3, paddingX: 2, my: 3 }}>
            <Grid item xs={5} sm={6} lg={8} sx={{ margin: 'auto' }}>
              <Typography align='left' component="div" variant="small" color='Gray'>
                <small>Placa: {dataLogin?.placa}</small>
              </Typography>
              <Typography align='left' component="div" variant="small" color='Gray'>
                Wolkswagen 2019 Golf
              </Typography>
            </Grid>
            <Grid item xs={5} sm={6} lg={4}>
              <img src={armaTuPlanPersona} width='60%' alt='' style={{ display: 'block', margin: 'auto' }} />
            </Grid>
          </Grid>

          <Grid container sx={{ my: 3 }} spacing={1}>
            <Grid item xs={12} sm={6} lg={7}>
              <Typography align='left' component="div" variant="small" color='Gray'>
                Indica la suma asegurada
              </Typography>
              <Grid container>
                <Grid item xs={6} sm={6} lg={6}>
                  <Typography align='left' component="div" variant="small" color='Gray'>
                    <small>MIN $12,500</small>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                  <Typography align='left' component="div" variant="small" color='Gray'>
                    <small>MAX $16,500</small>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} lg={5}>
              <TextField
                inputProps={{ maxLength: 15 }}
                fullWidth
                disabled
                size='small'
                id='numeroDeDocumento'
                variant='outlined'
                value='$ 14,300'
                InputProps={{
                  startAdornment: <InputAdornment position="start"><RemoveIcon /></InputAdornment>,
                  endAdornment: <InputAdornment position="end"><AddIcon /></InputAdornment>
                }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography align='left' component="div" variant="p" color='Gray'>
            <strong>Agrega o quita coberturas</strong>
          </Typography>

          <Box sx={{ width: '100%', my: 3, padding: 0 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab sx={{ maxWidth: '33.333%' }} value={0} label="Protege a tu auto" />
              <Tab sx={{ maxWidth: '33.333%' }} value={1} label="Protege a los que te rodean" />
              <Tab sx={{ maxWidth: '33.333%' }} value={2} label="Mejora tu plan" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0} >
            <Accordion expanded={expanded === 'panel1'} onChange={handleChangePanel('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='error' />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography align='left' component="div" variant="p" color='Gray'>
                  <strong>Llanta robada</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align='left' component="div" variant="small" color='Gray'>
                  He salido de casa a las cuatro menos cinco para ir a la academia de ingles de mi pueblo (Sant Cugat, al lado de Barcelona) con mi bici, na llego a la academia que está en el centro del pueblo en una plaza medio-grande y dejo donde siempre la bici atada con una pitón a un sitio de esos de poner las bicis
                  y mucho más
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChangePanel('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='error' />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography align='left' component="div" variant="p" color='Gray'>
                  <strong>Choque y/o pasarte la luz roja</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align='left' component="div" variant="small" color='Gray'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChangePanel('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='error' />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography align='left' component="div" variant="p" color='Gray'>
                  <strong>Atropello en la vía Evitamiento</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails align='left' component="div" variant="small" color='Gray'>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Protege a los que te rodean
          </TabPanel>
          <TabPanel value={value} index={2}>
            Mejora tu plan
          </TabPanel>

        </Container>
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <Container maxWidth='xs'>
          <Typography align='left' component="div" variant="P" color='Gray'>
            MONTO
          </Typography>
          <Typography align='left' component="div" variant="h5" color='Gray'>
            $35.00
          </Typography>
          <Typography align='left' component="div" variant="small" color='Gray'>
            <small>mensuales</small>
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography align='left' component="div" variant="small" color='Gray'>
            El precio incluye:
          </Typography>
          <Typography align='left' component="div" variant="small" color='Gray'>
            <small><CheckIcon fontSize="small" color='success' />Llanta de respuesto</small>
          </Typography>
          <Typography align='left' component="div" variant="small" color='Gray'>
            <small><CheckIcon fontSize="small" color='success' />Analisis de motor</small>
          </Typography>
          <Typography align='left' component="div" variant="small" color='Gray'>
            <small><CheckIcon fontSize="small" color='success' />Aros gratis</small>
          </Typography>

          <LoadingButton
            onClick={() => navigate('/caso-gracias')}
            sx={{ mt: 2 }}
            size='large'
            color='error'
            variant='contained'
          >
            LO QUIERO
          </LoadingButton>
        </Container>
      </Grid>
    </Grid>
  )
}

export default ArmaTuPlan