import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/signup";
import Publish from "./pages/publish";
import User from "./pages/user";
import Main from "./pages/main";
import SinglePhoto from "./pages/singlePhoto";
// import MainCarousel from "./pages/MainCarousel";

const App = () =>
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signup" component={Signup} />
        <Route path="/publish" component={Publish} />
        <Route path="/user/:id" component={User} />
        <Route path="/photo/:id" component={SinglePhoto} />
      </Switch>
    </div>
  </Router>;

export default App;

