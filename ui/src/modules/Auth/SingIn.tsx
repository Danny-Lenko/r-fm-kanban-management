import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useAuth } from '../../main/AuthProvider';

function Copyright(props: any) {
   return (
      <Typography
         variant='body2'
         color='text.secondary'
         align='center'
         {...props}
      >
         {'Copyright © '}
         <Link color='inherit' href='https://mui.com/'>
            Your Website
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

export function SignIn() {
   const navigate = useNavigate();
   const { signIn } = useAuth();

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const userNameOrEmail = data.get('userName');
      const password = data.get('password');

      if (userNameOrEmail && password) {
         await signIn({ userNameOrEmail, password });
         return navigate('/');
      }

      console.log('not all credentials');
   };

   const handleSignupLink = () => navigate('/sign-up');

   return (
      <Container component='main' maxWidth='xs'>
         <CssBaseline />
         <Box
            sx={{
               marginTop: 8,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
               Sign in
            </Typography>
            <Box
               component='form'
               onSubmit={handleSubmit}
               noValidate
               sx={{ mt: 1 }}
            >
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='userName'
                  label='Username Or Email'
                  name='userName'
                  autoComplete='userName'
                  autoFocus
               />
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
               />
               <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
               />
               <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
               >
                  Sign In
               </Button>
               <Grid container>
                  <Grid item xs>
                     <Link href='#' variant='body2'>
                        Forgot password?
                     </Link>
                  </Grid>
                  <Grid item>
                     <Link variant='body2' onClick={handleSignupLink}>
                        {"Don't have an account? Sign Up"}
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
         <Copyright sx={{ mt: 8, mb: 4 }} />
         <RouterLink to={'/testing-page'}>GO TO TESTING PAGE</RouterLink>
      </Container>
   );
}
