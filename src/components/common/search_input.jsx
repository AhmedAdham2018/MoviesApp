const SearchInput = ({value , onChange}) => {
    return (<input value={value} type="text" className="form-control my-4" placeholder="Search..." name="query" onChange={e => onChange(e.currentTarget.value)}  />
    );
}
 
export default SearchInput;