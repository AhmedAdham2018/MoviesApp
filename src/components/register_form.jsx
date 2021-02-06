import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';

class RegisterForm extends Form {
    state = {
        data: {
            name: '',
            username: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        name: Joi.string()
        .required()
        .min(6)
        .max(20),
        username: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .required()
        .min(6)
        .max(20)
    };

    doSubmit = () => {
        console.log("regitrastion submitted.");
    }

    render() { 
        return ( <React.Fragment>
            <h1>Please register your account.</h1>
            <form onSubmit={this.submitHandler}>
                {this.renderInput('name' , 'Name')}
                {this.renderInput('username' , 'Username' , 'email')}
                {this.renderInput('password' , 'Password' , 'password')}
                {this.renderButton('Register')}    
            </form>      
        </React.Fragment> );
    }
}

 
export default RegisterForm;