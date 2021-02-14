import { Route , Switch , Redirect } from 'react-router-dom';
import React from 'react';
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

import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {
  return (
      <React.Fragment>
          <ToastContainer />
          <Header />
          <main className="container">
          <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" render={props => <MovieForm {...props}/>} />
            <Route path="/about" component={About} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/movies" component={Movies}/>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found"/>
          </Switch>
          </main>
      </React.Fragment>
  );
}

export default App;
