import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger.png';

const logo = (props) => (
  <div className={classes.Logo}>
    <span><i>NTL</i></span>
    <img src={burgerLogo} alt="logo"></img>
  </div>
);

export default logo;