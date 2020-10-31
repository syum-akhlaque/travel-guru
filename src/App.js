import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Booking from './Components/Booking/Booking';
import Hotel from './Components/Hotel/Hotel';
import Header from './Components/Header/Header';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import defaultResort from './FakeData/defaultResort'
export const resortContext = createContext();
export const userContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
   useEffect(() => {
    document.title = "Travel Guru"
 }, []);
  const [currentResort,setSCurrentResort] = useState(defaultResort);
  return (
    <userContext.Provider value = {[loggedInUser,setLoggedInUser]} >
    <resortContext.Provider value = {[currentResort,setSCurrentResort]} >
    <Router>
          <Header/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>

            <Route exact path="/home">
              <Home/>
            </Route>

            <Route exact path="/booking">
              <Booking/>
            </Route>

            <PrivateRoute exact path="/hotel">
              <Hotel/>
            </PrivateRoute>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route path='*'>
              <h2 className = 'text-center py-5'> 4O4  not found .......</h2>
           </Route>
          </Switch>
      </Router>
      </resortContext.Provider>
      </userContext.Provider>
  );
}

export default App;
