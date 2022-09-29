import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
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

import { checkIfUserLogged, logoutUser } from '../../fakeDB';
import { useNavigate } from "react-router-dom";
import { getUser, saveUserUpdateToDb } from "../../fakeDB";
import { validateSignupForm } from "../../utils";

import useStyles from './Header.styles';
import { Outlet } from "react-router-dom";

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [editedUser, setEditedUser] = useState(true);
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const isLogged = checkIfUserLogged();
    if (isLogged) {
      const user = getUser();
      setUserData(user);
    }
  }, []);


  const handleClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logoutUser();
    handleClick();
  };

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
        // handleClick();
        console.log("User Saved!");
        alert('Profile Information Updated.');
      }
    }
  };

  const handleOnChange = (e) => setUserData((prevState) => ({...prevState, [e.target.name]: e.target.value}));

  const renderUser = () => (
    <React.Fragment>
      <form className={classes.formEdit} noValidate autoComplete="off">
        <div>
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
          <div className={classes.buttons}><Button onClick={handleSubmitForm}>Submit</Button>
            <Button onClick={() => setEditedField(false)} variant="contained" color="primary">
              Edit
            </Button>
            <Button onClick={() => setEditedUser(true)} variant="contained" color="secondary">
              Close
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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon/>
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            Header
          </Typography>
          <div className={classes.grow}/>
          <div className={classes.sectionDesktop}>
            <div className={classes.desktopUserName}>{userData.firstName}</div>
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
            <div className={classes.currentUserName}>{userData.firstName}</div>
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
      <Outlet />
    </div>
  );
}