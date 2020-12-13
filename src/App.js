import React from 'react'
import './App.css';
import HomePage from './Component';
import SignUp from './Component/signupPage';
import ViewProfile from './Component/view-profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Router>
        
        <Switch>
          <Route exact path="/homepage">
            <HomePage />
          </Route>
          <Route path="/profile">
            <ViewProfile />
          </Route>
          <Route path="/">
            <SignUp />
          </Route>
        </Switch>
    </Router>
      
    </div>
  );
}

export default App;
