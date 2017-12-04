import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/signup";
import Publish from "./pages/publish";
import User from "./pages/user";
import Main from "./pages/main";
// import MainCarousel from "./pages/MainCarousel";

const App = () =>
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/publish" component={Publish} />
        <Route exact path="/user" component={User} />
      </Switch>
    </div>
  </Router>;

export default App;

