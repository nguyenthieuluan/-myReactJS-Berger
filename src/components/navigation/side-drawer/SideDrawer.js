import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigation-items/NavigationItems';
import Aux from '../../../hoc/ReactAux/ReactAux';
import BackDrop from '../../ui/backdrop/BackDrop';

const sideDrawer = (props) => {
  let attachClass = [classes.SideDrawer, classes.Close];
  if(props.open)
    attachClass = [classes.SideDrawer, classes.Open];
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed}  />
      <div className={attachClass.join(' ')}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <NavigationItems/>
      </div>
    </Aux>
  );
};

export default sideDrawer;