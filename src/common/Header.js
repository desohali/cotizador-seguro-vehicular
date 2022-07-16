import React from 'react';
import { Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import LogoRimac from '../assets/images/logoRimac.svg';
import PhoneIcon from '@mui/icons-material/Phone';

const Header = () => {
  const matches = useMediaQuery('(min-width:768px)');

  return (
    <>
      <Grid container spacing={2} sx={{ width: '100%', py: 2 }}>
        <Grid item xs={6}>
          <img src={LogoRimac} width='120px' alt='' style={{ display: 'block', margin: 'auto' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography align='center' component="div" variant="small" color='Gray'>
            {matches && (
              <>
                <span>¿Tienes alguna duda? </span>
                <a href='tel:(01) 411 6001' style={{ display: 'inline-block' }}>
                  <PhoneIcon style={{ float: 'left' }} />
                  (01) 411 6001
                </a>
              </>
            )}
            {!matches && (
              <a href='tel:(01) 411 6001' style={{ display: 'inline-block' }}>
                <PhoneIcon style={{ float: 'left' }} />
                Llámanos
              </a>
            )}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </>
  )
};

export default Header;