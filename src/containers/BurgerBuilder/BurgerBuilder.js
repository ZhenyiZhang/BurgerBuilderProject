import React, {Component} from 'react';
import Burger from "../../components/burger/Burger";
import BuildControls from "../../components/burger/buildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    bacon: 1,
    salad: 0.5,
    cheese: 0.5,
    meat: 2
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            bacon: 0,
            salad: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
    };

    addIngredientHandler = (type) => {
        let newState = {...this.state.ingredients};
        newState[type] += 1;
        const addPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({
            ingredients: newState,
            totalPrice: addPrice
        })
    };
    removeIngredientHandler = (type) => {
        let newState = {...this.state.ingredients};
        if(newState[type] === 0) return;
        newState[type] -= 1;
        const removedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: newState,
            totalPrice: removedPrice
        })
    };
    continuePurchasing = () => {
        alert('Order Confirmed');
    };
    purchasingHandler = () => {
        this.setState({
            purchasing: !this.state.purchasing
        })
    };

    render() {
        let disableButtons = {...this.state.ingredients};
        for (let key in disableButtons) {
            const amount = disableButtons[key];
            disableButtons[key] = (amount <= 0);
        }
        return(
            <div>
                <Modal
                    backDropClick={this.purchasingHandler}
                    show={this.state.purchasing}>
                    <OrderSummary
                        cancel={this.purchasingHandler}
                        continue={this.continuePurchasing}
                        price={this.state.totalPrice}
                        summary={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    disableInfo={disableButtons}
                    price={this.state.totalPrice}
                    amount={this.state.ingredients}
                    purchasing={this.purchasingHandler}
                />
            </div>
        );
    }
}
export default BurgerBuilder;