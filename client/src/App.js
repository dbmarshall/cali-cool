import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/signup";
import Publish from "./pages/publish";

const App = () => 

  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <h1>Hellow world</h1>}/>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/publish" component={Publish} />
      </Switch>
    </div>
  </Router>;

export default App;

