import React, {Component} from 'react';

import Aux from '../ReactAux/ReactAux';
import classes from './Layout.css';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import SideDrawer from '../../components/navigation/side-drawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false})
  };
  sideDrawerToggleHandler = () => {
    this.setState((preState) => { return { showSideDrawer: !preState.showSideDrawer }} )
  };

  render() {
    return (
      <Aux>
        <Toolbar clicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;