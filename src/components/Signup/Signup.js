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

//move to utils
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateForm = (formData) => {
  const err = {};

  if (!formData.firstName.trim().length) {
    err.firstName = true;
  }

  if (!formData.lastName.trim().length) {
    err.lastName = true;
  }

  if (!formData.email.toLowerCase().match(EMAIL_REGEX)) {
    err.email = true;
  }

  if (!formData.password.length) {
    err.password = true;
  }

  if (!formData.confirmPassword.trim().length || formData.password !== formData.confirmPassword) {
    err.confirmPassword = true;
  }

  return err;
};

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
  }
  // rename to userData, setUserData
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateForm(formData);
    setErrors(err);

    if (!Object.keys(err).length) {
      const { success, message } = registerUser(formData);
      if (!success) {
        setErrors(prevState => ({ ...prevState, email: message }));
      } else {
        // redirect to home
        handleClick();
      }
    }
  };

  const handleOnChange = (e) => setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}));
  const emailErrorHelperText = typeof errors.email === "string" ? errors.email : '';

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
                value={formData.firstName}
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
                value={formData.lastName}
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
                value={formData.email}
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
                value={formData.password}
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
                value={formData.confirmPassword}
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
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I SHO I ?"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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