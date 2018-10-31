import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import BurgerBuilder from './containers/burger-builder/BurgerBuilder';
import Checkout from "./containers/checkout/Checkout";
import {Route, Switch} from "react-router-dom";
import Orders from "./containers/orders/Orders";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h1 className="App-title">Welcome</h1>*/}
        {/*</header>*/}

        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>

      </div>
    );
  }
}

export default App;
