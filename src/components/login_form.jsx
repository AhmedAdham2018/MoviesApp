import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { login } from '../services/authService';

class LoginForm extends Form {

    state = {
        data: {
            email: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
        .required()
        .min(6)
        .max(20)
    };

    doSubmit = async() => {
        try {
            const {data} = this.state;
            await login(data.email , data.password);
            //console.log("Login submitted.");
            //this.props.history.push("/");
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
            <h1>Please Login.</h1>
            <form onSubmit={this.submitHandler}>
                {this.renderInput('email' , 'Email' ,'email')}
                {this.renderInput('password' , 'Password' ,'password')}
                {this.renderButton('Login')}    
            </form>      
        </React.Fragment> );
    }
}
 
export default LoginForm;