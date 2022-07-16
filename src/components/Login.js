import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, useMediaQuery } from '@mui/material';


import AutoSeguro from '../assets/images/autoSeguro.svg';
import AutoSeguroMovil from '../assets/images/autoSeguroMovil.svg';

const validationSchema = yup.object({
  tipoDeDocumento: yup
    .string()
    .min(3, 'Tipo de documento debe tener una longitud mínima de 6 caracteres')
    .max(20, 'Tipo de documento debe tener una longitud maxima de 20 caracteres')
    .required('Tipo de documento es requerido'),
  numeroDeDocumento: yup
    .string()
    .required('N° de documento es requerido')
    .matches(/^[0-9]+$/, 'Solo se permite dígitos')
    .min(8, 'N° de documento debe tener una longitud mínima de 8 dígitos')
    .max(15, 'N° de documento debe tener una longitud maxima de 15 dígitos'),
  numeroDeCelular: yup
    .string()
    .required('N° de celular es requerido')
    .matches(/^[0-9]+$/, 'Solo se permite dígitos')
    .min(9, 'N° de celular debe tener una longitud mínima de 9 dígitos')
    .max(9, 'N° de celular debe tener una longitud maxima de 9 dígitos'),
  placa: yup
    .string()
    .min(6, 'Placa debe tener una longitud mínima de 6 caracteres')
    .max(10, 'Placa debe tener una longitud maxima de 10 caracteres')
    .required('Placa es requerido'),
  politicas: yup
    .boolean()
    .isTrue('Debe aceptar las politicas para continuar')
    .required('Politicas es requerido'),
});

const SeguroVehicularTracking = ({ isMobile = false }) => {
  return (
    <div style={{ padding: '1rem', height: '100%', display: 'table' }}>
      <div style={{ display: 'table-cell', verticalAlign: isMobile ? 'middle' : '' }}>
        <Typography align='left' component="div" variant="strong" color='Gray'>
          ¡NUEVO!
        </Typography>
        <Typography align='left' component="div" variant="h5" color='Gray'>
          Seguro <span style={{ color: '#d32f2f' }}>Vehicular Tracking</span>
        </Typography>
        <Typography align='left' component="div" variant="small" color='Gray'>
          <small>Cuentanos donde le haras seguimiento a tu seguro</small>
        </Typography>
      </div>
    </div>
  )
};

const findUser = ({ id }) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const json = await response.json();

    // we simulate a delay of 1000 ms
    setTimeout(() => resolve(json), 1000);
  });
};

const Login = () => {

  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:768px)');
  const [loading, setLoading] = React.useState(false);

  const formikLogin = useFormik({
    initialValues: {
      tipoDeDocumento: 'DNI',
      numeroDeDocumento: '',
      numeroDeCelular: '',
      placa: '',
      politicas: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      findUser({ id: 1 })
        .then((user) => {
          sessionStorage.setItem('userTemp', JSON.stringify(user));
          sessionStorage.setItem('dataTemp', JSON.stringify(values));
          formikLogin.resetForm();
          navigate('arma-tu-plan');
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  /* React.useEffect(() => {
    sessionStorage.removeItem('userTemp');
    sessionStorage.setItem('dataTemp', JSON.stringify(values));
  }, []); */

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={5} lg={4} className='background-auto-seguro'>
        <Grid container>
          <Grid item xs={12} sm={1} lg={3} />
          <Grid item xs={12} sm={11} lg={6}>
            {matches && (
              <>
                <img src={AutoSeguro} width='100%' alt='' style={{ marginTop: '50%' }} />
                <SeguroVehicularTracking />
              </>
            )}

            {!matches && (
              <Grid container>
                <Grid item xs={8}>
                  <SeguroVehicularTracking isMobile />
                </Grid>
                <Grid item xs={4}>
                  <img src={AutoSeguroMovil} width='100%' alt='' style={{ marginTop: '25%' }} />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} sm={12} lg={3} />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={7} lg={8} sx={{ margin: 'auto' }}>
        <Container maxWidth='xs'>
          <form onSubmit={formikLogin.handleSubmit}>
            <Typography align='left' component="div" variant="h4" color='Gray'>
              Déjanos tus datos
            </Typography>

            <Grid container sx={{ my: 2 }}>
              <Grid item xs={5} sm={6} lg={4}>
                <TextField
                  select
                  fullWidth
                  id="tipoDeDocumento"
                  label="Tipo de documento"
                  className='border-end'
                  value={formikLogin.values.tipoDeDocumento}
                  sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  onChange={formikLogin.handleChange}
                  error={formikLogin.touched.numeroDeDocumento && Boolean(formikLogin.errors.numeroDeDocumento)}
                  helperText={formikLogin.touched.numeroDeDocumento && formikLogin.errors.numeroDeDocumento}
                >
                  <MenuItem value='DNI'>DNI</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={7} sm={6} lg={8}>
                <TextField
                  inputProps={{ maxLength: 15 }}
                  fullWidth
                  id='numeroDeDocumento'
                  label='N° de documento'
                  className='border-start'
                  variant='outlined'
                  value={formikLogin.values.numeroDeDocumento}
                  onChange={formikLogin.handleChange}
                  error={formikLogin.touched.numeroDeDocumento && Boolean(formikLogin.errors.numeroDeDocumento)}
                  helperText={formikLogin.touched.numeroDeDocumento && formikLogin.errors.numeroDeDocumento}
                />
              </Grid>
            </Grid>

            <TextField
              inputProps={{ maxLength: 9 }}
              fullWidth
              id='numeroDeCelular'
              label='N° de celular'
              variant='outlined'
              sx={{ mb: 2 }}
              value={formikLogin.values.numeroDeCelular}
              onChange={formikLogin.handleChange}
              error={formikLogin.touched.numeroDeCelular && Boolean(formikLogin.errors.numeroDeCelular)}
              helperText={formikLogin.touched.numeroDeCelular && formikLogin.errors.numeroDeCelular}
            />

            <TextField
              inputProps={{ maxLength: 10 }}
              fullWidth
              id='placa'
              label='Placa'
              variant='outlined'
              sx={{ mb: 2 }}
              value={formikLogin.values.placa}
              onChange={formikLogin.handleChange}
              error={formikLogin.touched.placa && Boolean(formikLogin.errors.placa)}
              helperText={formikLogin.touched.placa && formikLogin.errors.placa}
            />

            <FormControlLabel
              sx={{ width: '100%', mb: formikLogin.touched.politicas && Boolean(formikLogin.errors.politicas) ? 0 : 2 }}
              control={(
                <Checkbox
                  id='politicas'
                  color='success'
                  checked={formikLogin.values.politicas}
                  onChange={formikLogin.handleChange}
                />
              )}
              label={
                <Typography align='left' component="p" variant="p" color='Gray'>
                  Acepto la <a href='/'>Política de Protección de Datos Personales</a> y los <a href='/'>Términos y Condiciones.</a>
                </Typography>
              } />

            {formikLogin.touched.politicas && Boolean(formikLogin.errors.politicas) && (
              <Typography
                align='left' component="p" variant="p" color='error'
                className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root'>
                {formikLogin.errors.politicas}
              </Typography>
            )}

            <LoadingButton
              onClick={formikLogin.handleSubmit}
              sx={{ mt: 2 }}
              size='large'
              color='error'
              variant='contained'
              loading={loading}
            >
              COTÍZALO
            </LoadingButton>
          </form>
        </Container>
      </Grid>
    </Grid>
  )
};

export default Login;