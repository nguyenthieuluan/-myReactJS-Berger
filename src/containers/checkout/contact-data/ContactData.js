import React, {Component} from 'react';
import Button from "../../../components/ui/button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/ui/spinner/Spinner";

class ContactData extends Component{
  state = {
    name: '',
    email: '',
    address: '',
    loading: false
  };
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'ntl',
        address: 'mars',
        email: 'meomeo@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then( () => {
        this.setState({loading: false});
        this.props.history.push('/')
      })
      .catch(error => { console.log(error.response); this.setState({loading: false}) });
  };
  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="your name"/>
        <input type="email" name="email" placeholder="your email"/>
        <input type="text" name="address" placeholder="your address"/>
        <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;