import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';


class About extends Component {
    state = {  }
    render() { 
        return ( <React.Fragment>
            <h1>About us</h1>
            <div className="row">
                <div className="col-3">
                    <ul>
                        <li>
                            <Link to="/about/company">About Company</Link>
                        </li>
                        <li>
                            <Link to="/about/team">About Team</Link>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <Route path="/about/company" component={Company}/>
                    <Route path="/about/team" component={Team}/>
                </div>
            </div>
        </React.Fragment> );
    }
}

const Team = () => {
    return ( <h1>Our team</h1> );
}
 
const Company = () => {
    return ( <h1>Our company</h1> );
}
 

 
export default About;