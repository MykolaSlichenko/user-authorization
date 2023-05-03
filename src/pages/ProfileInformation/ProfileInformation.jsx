import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { validateSignupForm} from '../../utils';
import {getUser, registerUser, saveUserUpdateToDb, deleteUserFromDb} from "../../fakeDB";
import { useNavigate } from "react-router-dom";
import { checkIfUserLogged } from '../../fakeDB';
import useStyles from './ProfileInformation.styles';

import { useDispatch, useSelector } from 'react-redux';
import { setUserData, updateUserField } from '../../store/userAction';

import DialogMessage from '../../components/DialogMessage/DialogMessage';

export default function ProfileInformation() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [editedField, setEditedField] = useState(true);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);


  useEffect(() => {
    const isLogged = checkIfUserLogged();
    if (isLogged) {
      const user = getUser();
      dispatch(setUserData(user)); // dispatch action to update userData
    }
  }, [dispatch]);

  const handleDeleteUser = () => {
    const { success, message } = deleteUserFromDb(userData);
    if (!success) {
      setErrors(prevState => ({ ...prevState, email: message }));
    } else {
      handleClickOpenDelete();
      // navigate("/signup");
    }
  };

  const handleClickOpenModalMessage = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDialogDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };

  const handleClick = () => {
    navigate("/home");
  };

  const handleClickCloseProfileInfo = () => {
    const user = getUser();
    dispatch(setUserData(user));
    handleClickOpenModalMessage();
    // navigate("/home");
  };

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
        // alert('Profile information has been updated.');
        handleClickCloseProfileInfo();
      }
    }
  };


  const handleOnChange = (e) => {
    dispatch(updateUserField(e.target.name, e.target.value));
  };
  // const handleOnChange = (e) => setUserData((prevState) => ({...prevState, [e.target.name]: e.target.value}));

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
                  <Button onClick={() => setEditedField(true)} variant="contained">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteUser} variant="contained" color="secondary">Delete</Button>
                </div> }
          </div>
          <DialogMessage
            open={open}
            handleClose={handleClose}
            title="Message from 3000!!!!!"
            message="Profile information has been updated."
            buttonLabel="Ok"
          />
          <DialogMessage
            open={openDialogDelete}
            handleClose={handleCloseDelete}
            title="Very urgent message from 3000!!!!!"
            message="Your profile has been permanently deleted!"
            buttonLabel="Ok"
          />
        </form>
      </div>
    </Container>
  );
}