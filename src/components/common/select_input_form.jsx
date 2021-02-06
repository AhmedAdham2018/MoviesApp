const SelectInput = ({name , label , options , error , ...rest}) => {
    return ( <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select name={name}  className="custom-select" id={name} {...rest}>   
    {options.map(option => (<option key={option._id} value={option._id}>{option.name}</option>))}
    </select>
    {error && <div className="alert alert-danger">{error}</div>}   
    </div> );
}
 
export default SelectInput;