import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/signup";
import Publish from "./pages/publish";
import Main from "./pages/main";


const App = () => 

  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/publish" component={Publish} />
      </Switch>
    </div>
  </Router>;

export default App;

