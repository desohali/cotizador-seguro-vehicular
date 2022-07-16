import { LoadingButton } from '@mui/lab';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

import PersonaGracias from '../assets/images/personaGracias.svg';
import PersonaGraciasMovil from '../assets/images/personaGraciasMovil.svg';

const CasoGracias = () => {
  const matches = useMediaQuery('(min-width:768px)');
  const dataUser = JSON.parse(sessionStorage.getItem('userTemp') || '{}');

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={5} lg={4} sx={{ margin: 'auto' }}>
        {matches && <img src={PersonaGracias} width='75%' alt='' style={{ marginTop: '33.333%' }} />}
        {!matches && <img src={PersonaGraciasMovil} width='100%' alt='' />}
      </Grid>
      <Grid item xs={12} sm={7} lg={8} sx={{ margin: 'auto' }}>
        <Container maxWidth='xs'>
          <Typography align='left' component="div" variant="h5" color='#d32f2f'>
            ¡Te damos la bienvenida!
          </Typography>
          <Typography align='left' component="div" variant="h5" color='Gray'>
            Cuenta con nosotros para proteger tu vehículo
          </Typography>
          <Typography align='left' component="div" variant="p" color='Gray'>
            Enviaremos la confirmación de compra de tu Plan Vehícular Tracking a tu correo:
          </Typography>
          <Typography align='left' component="div" variant="p" color='Gray'>
            {dataUser?.email}
          </Typography>

          <LoadingButton
            sx={{ mt: 3 }}
            size='large'
            color='error'
            variant='contained'
          >
            CÓMO USAR MI SEGURO
          </LoadingButton>
        </Container>
      </Grid>
    </Grid>
  )
}

export default CasoGracias