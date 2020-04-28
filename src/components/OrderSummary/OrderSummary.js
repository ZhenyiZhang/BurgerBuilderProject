import React, {Component} from 'react';
import Classes from './SummaryButtons.css';
import Axios from "axios";

const instance = Axios.create({
    baseURL: 'http://localhost:5000'
});

class OrderSummary extends Component {
    state = {
        name: '',
        phone: ''
    };

    nameHandler = (event) => {
        this.setState(
            {name: event.target.value}
        )
    };


    phoneHandler = (event) => {
        this.setState(
            {phone: event.target.value}
        )
    };

    continueHandler = () => {
        const order = {
            phone: this.state.phone,
            name: this.state.name,
            items: this.props.summary,
            timeOrdered: Date.now()};
        instance.post('/order/', order)
            .then((response) => {
                alert('Your order number is: ' + response.data.orderNumber);})
            .catch((err) => {alert(err)});
    };

    render() {
        const summary = Object.keys(this.props.summary).map((key, index) => {
            return(
                <li key={key + index}
                    style={{listStylePosition: 'inside'}}>
            <span style={{ textTransform: 'capitalize'}}>
                {key}: {this.props.summary[key]}
            </span>
                </li>);
        });
        return (
            <div style={{textAlign:'center'}}>
                <h3>Your Order Summary:</h3>
                <ul>
                    {summary}
                </ul>
                <h4> Total Price ${this.props.price}</h4>
                <p>Your Name:</p>
                <input onChange={this.nameHandler}/>
                <br/>
                <p>Your Phone Number:</p>
                <input onChange={this.phoneHandler}/>
                <br/>
                <button
                    onClick={this.continueHandler}
                    className={[Classes.Button, Classes.Success].join(' ')}>Continue</button>
                <button
                    onClick={this.props.cancel}
                    className={[Classes.Button, Classes.Danger].join(' ')}>Cancel</button>
            </div>
        );
    }
}

export default OrderSummary;