import axios from "axios";

export default {
  // Hits API for articles
  //  (API Documentation: https://developer.nytimes.com)  
  sessionData: function() {
    console.log("mounted componet");
    return axios.get("/session")
  },

  signUpUser: function(userData) {
    return axios.post("api/signup", userData);
  },

  loginUser: function(userData) {
    console.log(userData);
    return axios.post("api/login", userData);
    // return axios.post("api/signup", userData);
  },

  logout: function() {
    console.log("logout route hit")
    return axios.get("/logout");
  }


};
