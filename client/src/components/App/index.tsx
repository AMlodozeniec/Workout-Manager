import React from 'react';
import {
  Switch, Route, Redirect, Link,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

import '../../index.css';
import useStyles from './styles';
import Home from '../Home';


const App: React.FC = () => {
  const classes = useStyles();

  // const linkToHome = () => {
  //   <Link to="/">Workout Tracker</Link>
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.marginBottom}>
        <Toolbar>
          <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="menu">
            <img className="logo" src="https://st4.depositphotos.com/18690434/21332/v/1600/depositphotos_213323710-stock-illustration-dumbbell-vector-icon-isolated-on.jpg" alt="Logo" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Workout Tracker</Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about">
            <h1>About Page</h1>
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
