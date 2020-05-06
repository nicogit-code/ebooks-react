import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './shared/Header';
import BookList from './books/BookList';
import BookDetails from './books/BookDetails';
import AddBookReview from './books/AddBookReview';
import EditBookReview from './books/EditBookReview';

import Register from './auth/Register';
import Login from './auth/Login';
import UserProfile from './auth/UserProfile';

import UserContext from './auth/UserContext';

import axios from 'axios';

import { apiUrl } from '../api/Api';


// import './App.module.css';
import styles from './App.module.css';

axios.defaults.baseURL = apiUrl;


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider value={ { user, setUser } }>
      <BrowserRouter>
        <Header user="Nico" />
        <div className={styles.container} >
            <Route exact path="/">
              <BookList/>
            </Route>
            
            <Route exact path="/books/:bookId">
              <BookDetails/>
            </Route>
            
            <Route path="/books/add/:bookId">
              <AddBookReview/>
            </Route>

            <Route path="/books/edit/:reviewId">
              <EditBookReview/>
            </Route>

            <Route path="/register">
              <Register/>
            </Route>

            <Route path="/login">
              <Login/>
            </Route>

            <Route path="/profile">
              <UserProfile/>
            </Route>

            {/* <Route path="/userlibrary">
              <AddToLibrary/>
            </Route> */}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;


