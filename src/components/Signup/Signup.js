import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate } from "react-router-dom";

import { registerUser } from '../../fakeDB';

import  { validateSignupForm} from '../../utils';

//move to utils

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  // rename to userData, setUserData
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    check: false
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateSignupForm(userData);
    setErrors(err);

    if (!Object.keys(err).length) {
      const { success, message } = registerUser(userData);
      if (!success) {
        setErrors(prevState => ({ ...prevState, email: message }));
      } else {
        // redirect to home
        handleClick();
      }
    }
  };

  const toggleCheck = () => {
    setUserData(prevState => ({...prevState, check: !userData.check}));
  };

  const handleOnChange = (e) => setUserData((prevState) => ({...prevState, [e.target.name]: e.target.value}));
  const emailErrorHelperText = typeof errors.email === "string" ? errors.email : '';
  console.log('userData.check', userData.check);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/*<Avatar className={classes.avatar}>*/}
          {/*<LockOutlinedIcon />*/}
        {/*</Avatar>*/}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.firstName}
                value={userData.firstName}
                onChange={handleOnChange}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.lastName}
                value={userData.lastName}
                onChange={handleOnChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={emailErrorHelperText}
                value={userData.email}
                onChange={handleOnChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password}
                value={userData.password}
                onChange={handleOnChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.confirmPassword}
                value={userData.confirmPassword}
                onChange={handleOnChange}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" value={userData.check} onChange={toggleCheck} />}
                label="I agree to provide my personal information."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!userData.check}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

//      // setErrors(err);
//       // console.log('ERROR', err);
//       function setErrN() {
//         // const errNames = {};
//         if (err.firstName) {
//           // console.log('first name must not be empty!');
//           // errNames.firstName = true;
//           alert('First name must not be empty!');
//         } else if (err.lastName) {
//           // console.log('last name must not be empty!');
//           alert('Last name must not be empty!');
//         }
//         else if (err.email) {
//           // console.log('email not correct!');
//           alert('Email not correct!');
//         }
//         else if (err.password) {
//           // console.log('password must not be empty!');
//           alert('Password must not be empty!');
//         }
//         else if (err.confirmPassword) {
//           // console.log('confirm password not correct!');
//           alert('Confirm password not correct!');
//         }
//         // setErrName(errNames);
//       }
//       setErrN();