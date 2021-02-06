import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';

class LoginForm extends Form {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .required()
        .min(6)
        .max(20)
    };



    doSubmit = () => {
        console.log("Login submitted.");
    }

    render() { 
        return ( <React.Fragment>
            <h1>Please Login.</h1>
            <form onSubmit={this.submitHandler}>
                {this.renderInput('username' , 'Username' ,'email')}
                {this.renderInput('password' , 'Password' ,'password')}
                {this.renderButton('Login')}    
            </form>      
        </React.Fragment> );
    }
}
 
export default LoginForm;