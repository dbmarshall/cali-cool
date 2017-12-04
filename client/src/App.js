import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/signup";
import Publish from "./pages/publish";
import User from "./pages/user";
import Main from "./pages/main";
import SinglePhoto from "./pages/singlePhoto";
// import MainCarousel from "./pages/MainCarousel";
import AlbumView from "./pages/AlbumView";

const App = () =>
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
<<<<<<< HEAD
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/publish" component={Publish} />
        <Route exact path="/album/:id" component={AlbumView} />
=======
        <Route path="/signup" component={Signup} />
        <Route path="/publish" component={Publish} />
        <Route path="/user/:id" component={User} />
        <Route path="/photo/:id" component={SinglePhoto} />
>>>>>>> 99aa17789ba38a824226bc2991634a8d15329bb8
      </Switch>
    </div>
  </Router>;

export default App;

