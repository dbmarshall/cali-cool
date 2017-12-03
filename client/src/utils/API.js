import axios from "axios";

export default {
  // Hits API for articles
  //  (API Documentation: https://developer.nytimes.com)  
  sessionData: function() {
    console.log("mounted componet");
    return axios.get("/api/authentication/session")
  },

  signUpUser: function(userData) {
    return axios.post("/api/authentication/signup", userData);
  },

  loginUser: function(userData) {
    console.log(userData);
    return axios.post("/api/authentication/login", userData);
  },

  logout: function() {
    console.log("logout route hit")
    return axios.get("/api/authentication/logout");
  }


};
