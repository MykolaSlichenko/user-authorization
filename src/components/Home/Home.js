import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { alpha} from '@material-ui/core/styles';
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

import {checkIfUserLogged, logoutUser} from '../../fakeDB';
import { useNavigate } from "react-router-dom";
import { getUser } from "../../fakeDB";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  currentUserName: {
    padding: '14px',
    fontSize: '20px'
  },
  desktopUserName: {
    padding: '15px',
    fontSize: '30px'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [ currentUser, setCurrentUser ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    id: ''
  });
  // const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(true);

  useEffect(() => {
    const isLogged = checkIfUserLogged();
    if (!isLogged) {
      navigate("/login");
    } else {
      console.log('Login');
      const user = getUser();
      console.log('user', user);
      setCurrentUser(user);
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

//UI
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [open, setOpen] = React.useState(false);

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
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
          <ListItem button >
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText onClick={handleEditUser}>Profile Information</ListItemText>
          </ListItem>
      </List>
      <Divider />
      <List>
        {editedUser ? null : renderUser()}
      </List>
    </div>
  );

  //EDIT
  const renderUser = () => (
    <React.Fragment>
          <div>
            <p>FIRSTNAME: {currentUser.firstName}</p>
            <p>LASTNAME: {currentUser.lastName}</p>
            <p>EMAIL: {currentUser.email}</p>
            <p>PASSWORD: {currentUser.password}</p>
            <p>CONFIRMPASSWORD: {currentUser.confirmPassword}</p>
            {/*<p>ID: {currentUser.id}</p>*/}
            <button style={{backgroundColor: 'red'}}>Edit</button>
            <button onClick={() => setEditedUser(true)}>Close Profile Edit</button>
          </div>
    </React.Fragment>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <div className={classes.grow} />
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
              <AccountCircle />
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
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}