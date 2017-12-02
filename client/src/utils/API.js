import axios from "axios";

export default {
  // Hits API for articles
  //  (API Documentation: https://developer.nytimes.com)  

  signUpUser: function(userData) {
    return axios.post("api/signup", userData);
  },

  loginUser: function(userData) {
    console.log(userData);
    return axios.post("api/login", userData);
    // return axios.post("api/signup", userData);
},
  getRecentPhotos: function(){
    return axios.get("/api/photos/recent")
  }
};
