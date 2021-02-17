import Joi from "joi-browser";
import { Component } from 'react';
import Input from './input_form';
import SelectInput from "./select_input_form";



class Form extends Component {
    state = { 
        data: {},
        errors: {}
     }

     submitHandler = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} } );
        if(errors) return;

        this.doSubmit();
    };

    validate = () => {
        const { error }  = Joi.validate(this.state.data , this.schema , {abortEarly: false});
        if(!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperties = ({name , value}) => { 
        const obj = { [name]: value };
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj , schema);
        return error ? error.details[0].message : null;
    };

    
    changeFieldsHandler = ({currentTarget: input}) => {
        const errors = { ...this.state.errors };
        const messageErorr = this.validateProperties(input);
        if (messageErorr) {
            errors[input.name] = messageErorr;
        } else {
            delete errors[input.name];
        }

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data , errors });
    };

    renderButton = name => {
        return (<button disabled={this.validate()} className="btn btn-primary" type="submit">{name}</button>);

    };

    renderInput = (name , label, type = "text") => {
        const {data , errors} = this.state;
        return (<Input 
        name={name}
        label={label} 
        value={data[name]}
        type={type} 
        onChange={this.changeFieldsHandler}
        error={errors[name]} />);
    };

    renderSelectInput = (name, label , options) => {
        const {data , errors} = this.state;
        return (<SelectInput 
                    name={name}
                    value={data[name]}
                    label={label}
                    options={options}
                    error={errors[name]}
                    onChange={this.changeFieldsHandler} />);
    };





}
 
export default Form;