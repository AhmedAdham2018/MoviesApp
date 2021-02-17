import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { saveUser } from './../services/userService';
import { registerWithJwt } from '../services/authService';

class RegisterForm extends Form {
    state = {
        data: {
            name: '',
            email: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        name: Joi.string()
        .required()
        .min(6)
        .max(20),
        email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .required()
        .min(6)
        .max(20)
    };

    doSubmit = async () => {
        try {
            const response = await saveUser(this.state.data);
            registerWithJwt(response.headers['x-auth-token']);
            //this.props.history.push('/');
            //console.log("regitrastion submitted.");
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = {...this.state.errors};
                errors.email = error.response.data;
                this.setState({ errors: errors }); 
            }
        }

    }

    render() { 
        return ( <React.Fragment>
            <h1>Please register your account.</h1>
            <form onSubmit={this.submitHandler}>
                {this.renderInput('name' , 'Name')}
                {this.renderInput('email' , 'Email' , 'email')}
                {this.renderInput('password' , 'Password' , 'password')}
                {this.renderButton('Register')}    
            </form>      
        </React.Fragment> );
    }
}

 
export default RegisterForm;