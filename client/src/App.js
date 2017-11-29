import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/signup";

const App = () => 

  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  </Router>;;

export default App;

