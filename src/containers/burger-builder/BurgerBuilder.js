import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import BuildControls from '../../components/burger/build-controls/BuildControls';

import Burger from '../../components/burger/Burger';
import Modal from '../../components/ui/modal/Modal';
import Spinner from '../../components/ui/spinner/Spinner';
import OrderSummary from '../../components/burger/order-summary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 1,
  bacon: 2,
  cheese: 3,
  meat: 4
};


class BurgerBuilder extends Component{

  state = {
    ingredients: null,
    totalPrice: 1,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    axios.get( 'https://bando-186704.firebaseio.com/ingredients.json' )
      .then( response => {
        this.setState( { ingredients: response.data } );
      } )
      .catch( error => {
        this.setState( { error: true } );
      } );
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  };
  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };
  purchaseContinueHandler = () => {


    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?'+queryString
    });
  };

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }).reduce((sum,el) => {
        return sum + el;
      },0);
    this.setState({purchasable: sum>0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice : newPrice, ingredients : updateIngredients});
    this.updatePurchaseState(updateIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <=0 )
      return;
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({totalPrice : newPrice, ingredients : updateIngredients});
    this.updatePurchaseState(updateIngredients);
  };


  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error? <h1>Ingredient can't be loaded</h1> : <Spinner/>;
    if(this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients = { this.state.ingredients } />
        <BuildControls ingredientAdded = {this.addIngredientHandler}
                       ingredientRemoved = {this.removeIngredientHandler}
                       disabled={disableInfo}
                       purchasable={this.state.purchasable}
                       price={this.state.totalPrice}
                       ordered={this.purchaseHandler}
        />
      </Aux>;

      orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                   purchaseCancelled={this.purchaseCancelHandler}
                                   purchaseContinued={this.purchaseContinueHandler}
                                   price={this.state.totalPrice*10000+' VND'}/> ;
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
export default withErrorHandler(BurgerBuilder, axios);