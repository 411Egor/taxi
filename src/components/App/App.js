import React, { Component } from 'react';
import './App.css';


import Load from '../Load/Load'
import Login from '../Login/Login'
import Order from '../Order/Order'
import SearchDriver from '../SearchDriver/SearchDriver'
import Price from '../Price/Price'
import Driver from '../Driver/Driver'
import Road from '../Road/Road'
import Total from '../Total/Total'
import OrderOptions from '../OrderOptions/OrderOptions'
import EnterPin from '../EnterPin/EnterPin'

import {connect} from 'react-redux'

import changeScreenAction from "../../actions/changeScreenAction";

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.user.token === null) this.props.dispatch(changeScreenAction(<Order />));
    }

    render() {
        return this.props.app.currentScreen || <Load />;
    }
}

const mapStateToProps = (state) => {
    console.log('mapToProps');
    console.log(state);
    return state;
};

    

export default connect(mapStateToProps)(App)
