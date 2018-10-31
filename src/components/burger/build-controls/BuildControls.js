import React from 'react';
import classes from './BuildControls.css';
import BuildControl from "./build-control/BuildControl";

const controls =[
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
const buildControls = (props) => (
  <div className={classes.BuildControls}>

    <p>Current price: <strong>{(props.price*10000).toFixed(0)} VND</strong></p>

    {controls.map(ctrl => (
      <BuildControl key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
      />
    ))}

    <button className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchasable}>Order Now</button>

  </div>
);

export default buildControls;