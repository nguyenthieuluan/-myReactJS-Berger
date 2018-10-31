import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../logo/Logo';
import Navigation from '../../navigation/navigation-items/NavigationItems';
import DrawToggel from '../side-drawer/draw-toggle/DrawToggle';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawToggel clicked={props.clicked}/>
    <div className={classes.Logo}>
      <Logo/>
    </div>
    <nav className={classes.OnlyDesktop}>
      <Navigation/>
    </nav>
  </header>
);

export default toolbar;