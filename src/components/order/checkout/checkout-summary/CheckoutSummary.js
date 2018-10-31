import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from "../../../burger/Burger";
import Button from "../../../ui/button/Button";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it state well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button clicked={props.cancelledClicked} btnType="Danger">CANCEL</Button>
      <Button clicked={props.continuedClicked} btnType="Success">CONTINUE</Button>
    </div>
  )
};

export default checkoutSummary;
