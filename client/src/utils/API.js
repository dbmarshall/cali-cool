import axios from "axios";

export default {
  // Hits API for articles
  //  (API Documentation: https://developer.nytimes.com)  

  signUpUser: function(userData) {
    return axios.post("api/signup", userData);
  }
};
