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

import { checkIfUserLogged, logoutUser } from '../../fakeDB';
import { useNavigate } from "react-router-dom";
import { getUser } from "../../fakeDB";

import useStyles from './Header.styles';
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../store/userAction';

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const userData = useSelector(state => state.user);

  useEffect(() => {
    const isLogged = checkIfUserLogged();
    if (isLogged) {
      const user = getUser();
      dispatch(setUserData(user));
    }
  }, [dispatch]);

  const handleClick = () => {
    navigate("/login");
  };

  const handleOpenProfile = () => {
    setOpen(!open);
    navigate("/profile");
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
          <ListItemText onClick={handleOpenProfile}>Profile Information</ListItemText>
        </ListItem>
      </List>
      <Divider/>
    </div>
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
            <div className={classes.desktopUserName}>{userData.lastName}</div>
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