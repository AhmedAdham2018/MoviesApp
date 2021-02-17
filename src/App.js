import { Route , Switch , Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import {ToastContainer} from 'react-toastify';
import NotFound from './components/404';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieForm from './components/movie_form';
import LoginForm from './components/login_form';
import Header from './components/header';
import Movies from './components/movies';
import About from './components/about';
import RegisterForm from './components/register_form';
import Logout from './components/logout';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { getCurrentUser } from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';


class App extends Component {
  state = { };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() { 
    const { user } = this.state;
    return ( <React.Fragment>
      <ToastContainer />
      <Header user={user} />
      <main className="container">
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout}/>
          <Route path="/register" component={RegisterForm} />
          <ProtectedRoute path="/movies/:id" component={MovieForm}/>
          <Route path="/about" component={About} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/movies" render={props => <Movies {...props} user={user} /> }/>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found"/>
        </Switch>
      </main>
  </React.Fragment> );
  }
}
 
export default App;

