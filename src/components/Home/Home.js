import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {checkIfUserLogged, logoutUser} from '../../fakeDB';
import { useNavigate } from "react-router-dom";
import { getUser } from "../../fakeDB";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [ currentUser, setCurrentUser ] = useState({
    firstName: ''
  });

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <div>{currentUser.firstName}</div>
          <Button color="inherit" onClick={handleSubmit}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}