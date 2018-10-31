import React, {Component} from 'react';
import CheckoutSummary from '../../components/order/checkout/checkout-summary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from "./contact-data/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
  }
  checkoutCancelledHandle = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandle = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          cancelledClicked={this.checkoutCancelledHandle}
          continuedClicked={this.checkoutContinuedHandle}
          ingredients={this.state.ingredients}/>
        <Route path={this.props.match.path + '/contact-data'}
               render={(props)=>(<ContactData
                 ingredients = {this.state.ingredients}
                 price = {this.state.totalPrice}
                 {...props}/>)
               }
        />
      </div>
    );
  }
}

export default Checkout;