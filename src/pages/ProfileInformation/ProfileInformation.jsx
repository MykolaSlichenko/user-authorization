import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import { validateSignupForm} from '../../utils';
import {getUser, saveUserUpdateToDb} from "../../fakeDB";
import { useNavigate } from "react-router-dom";
import { checkIfUserLogged } from '../../fakeDB';
import useStyles from './ProfileInformation.styles';


export default function ProfileInformation() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [editedField, setEditedField] = useState(true);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    id: '',
  });
  const [errors, setErrors] = useState({});


  const handleClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    const isLogged = checkIfUserLogged();
    if (isLogged) {
      const user = getUser();
      setUserData(user);
    }
  }, []);


  const handleSubmitForm = (e) => {
    e.preventDefault();
    const err = validateSignupForm(userData);
    setErrors(err);

    if (!Object.keys(err).length) {
      const userId = userData.id;
      const {success, message} = saveUserUpdateToDb(userId, userData);
      if (!success) {
        setErrors(prevState => ({...prevState, email: message}));
      } else {
        // redirect to home
        // console.log("User Saved!");
        alert('Profile information has been updated.');
        handleClick();
      }
    }
  };

  const handleOnChange = (e) => setUserData((prevState) => ({...prevState, [e.target.name]: e.target.value}));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Button onClick={handleClick} variant="contained" color="secondary" className={classes.close}>
          X
        </Button>
        <form className={classes.formEdit} noValidate autoComplete="off">
            <TextField
              name="firstName"
              disabled={editedField}
              error={errors.firstName}
              onChange={handleOnChange}
              id="standard-required"
              label='First Name'
              value={userData.firstName}
            />
            <TextField
              name="lastName"
              disabled={editedField}
              error={errors.lastName}
              onChange={handleOnChange}
              id="standard-required"
              label='Last Name'
              value={userData.lastName}
            />
            <TextField
              name="email"
              disabled={editedField}
              error={errors.email}
              onChange={handleOnChange}
              id="standard-password-input"
              label="Email"
              type="email"
              autoComplete="current-password"
              defaultValue={userData.email}
              value={userData.email}
            />
            <TextField
              name="password"
              disabled={editedField}
              error={errors.password}
              onChange={handleOnChange}
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={userData.password}
            />
            <TextField
              name="confirmPassword"
              disabled={editedField}
              error={errors.confirmPassword}
              onChange={handleOnChange}
              id="standard-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              value={userData.confirmPassword}
            />
            <div className={classes.buttons}>

              {editedField
                ? <Button onClick={() => setEditedField(false)} variant="contained" color="primary">
                Edit
              </Button>
                :
                <div className={classes.button}>
                  <Button onClick={handleSubmitForm} variant="contained" color="primary">Save</Button>
                  <Button onClick={() => setEditedField(true)} variant="contained" color="secondary">
                    Cancel
                  </Button>
                </div> }
          </div>
        </form>
      </div>
    </Container>
  );
}