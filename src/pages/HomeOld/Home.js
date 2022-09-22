import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {alpha} from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {checkIfUserLogged, logoutUser, registerUser} from '../../fakeDB';
import {useNavigate} from "react-router-dom";
import {getUser} from "../../fakeDB";
import {validateSignupForm} from "../../utils";

import useStyles from './Home.styles';

export default function ButtonAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    id: ''
  });
  // const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(true);
  const [editedField, setEditedField] = useState(true);


  const handleClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logoutUser();
    handleClick();
  };

//UI
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleEditUser = () => {
    setEditedUser(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/*<MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>*/}
      <MenuItem color="inherit" onClick={handleSubmit}>Logout</MenuItem>
    </Menu>
  );
  // const handleEditUser = (user) => {
  //   setEditedUser(editedUser && user?.id === editedUser?.id ? null : user);
  // };
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {/*<MenuItem >Profile Information</MenuItem>*/}
      {/*// <MenuItem onClick={handleMenuClose}><div onClick={() => handleEditUser(user)>Edit Profile</div></MenuItem>*/}
      <MenuItem color="inherit" onClick={handleSubmit}>Logout</MenuItem>

    </Menu>
  );

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon><AccountCircle/></ListItemIcon>
          <ListItemText onClick={handleEditUser}>Profile Information</ListItemText>
        </ListItem>
      </List>
      <Divider/>
      <List>
        {editedUser ? null : renderUser()}
      </List>
    </div>
  );

  //EDIT
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const err = validateSignupForm(userData);
    setErrors(err);

    if (!Object.keys(err).length) {
      const {success, message} = registerUser(userData);
      if (!success) {
        setErrors(prevState => ({...prevState, email: message}));
      } else {
        // redirect to home
        handleClick();
      }
    }
  };

  const handleOnChange = (e) => setUserData((prevState) => ({...prevState, [e.target.name]: e.target.value}));

  const renderUser = () => (
    <React.Fragment>
      <form className={classes.formEdit} noValidate autoComplete="off">
        <div>
          <TextField
            disabled={editedField}
            error={errors.firstName}
            onChange={handleOnChange}
            id="standard-required"
            label='First Name'
            value={currentUser.firstName}
          />
          <TextField
            disabled={editedField}
            error={errors.lastName}
            onChange={handleOnChange}
            id="standard-required"
            label='Last Name'
            value={currentUser.lastName}
          />
          <TextField
            disabled={editedField}
            error={errors.email}
            onChange={handleOnChange}
            id="standard-password-input"
            label="Email"
            type="email"
            autoComplete="current-password"
            defaultValue={currentUser.email}
          />
          <TextField
            disabled={editedField}
            error={errors.password}
            onChange={handleOnChange}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            disabled={editedField}
            error={errors.confirmPassword}
            onChange={handleOnChange}
            id="standard-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
          />
          <div className={classes.buttons}><Button onClick={handleSubmitForm}>Submit</Button>
            <Button onClick={() => setEditedField(false)} variant="contained" color="primary">
              Edit
            </Button>
            <Button onClick={() => setEditedUser(true)} variant="contained" color="secondary">
              Close Profile
            </Button>
          </div>

        </div>
      </form>
    </React.Fragment>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                      onClick={toggleDrawer(true)}>
            <MenuIcon/>
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <div className={classes.grow}/>
          <div className={classes.sectionDesktop}>
            <div className={classes.desktopUserName}>{currentUser.firstName}</div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <div className={classes.currentUserName}>{currentUser.firstName}</div>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}