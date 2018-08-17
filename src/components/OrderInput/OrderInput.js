import React, { Component } from 'react';

import AsyncSelect from 'react-select/lib/Async';

import _ from 'underscore';

import {getStreet, HTTP_STATUS_USER_UNAUTHORIZED} from '../../fetch/fetch';


export default class OrderInput extends Component{

    constructor(props) {
        super(props);
        this.getOptions = _.throttle(this.promiseOptions,300)
        this.constOptions = [{ value: 'chocolate', label: 'На карте пропалить' },
            { value: 'strawberry', label: 'Любимое место (Жопа)' }];
    }


    state = { inputValue: '' };
    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    };


    promiseOptions(inputValue){
        return getStreet(inputValue, '$2y$10$4NtSAYIvkERQpcO74O2bR.O9rAFEXwXJNqcoyYGCZnrKz6hcju2TO')
            .then(resp => {
                if (resp.status === HTTP_STATUS_USER_UNAUTHORIZED) {

                }
                return resp.json();
            })
            .then(body => {
                return body.address_list.map(elem => {
                    return {
                        value: elem,
                        label: elem
                    }
                })
            })
            .then( (data) => {
                return data.concat(this.constOptions);
            });
    }



    render() {
        return (
            <AsyncSelect classNamePrefix="react-select" className="order-input" cacheOptions defaultOptions loadOptions={this.getOptions.bind(this)} />
        );
    }
}