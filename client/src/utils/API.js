import axios from "axios";

export default {

  signUpUser: function(userData) {
    console.log(userData);
    return axios.post("/api/authentication/signup", userData);
  },

  loginUser: function(userData) {
    console.log(userData);
    return axios.post("/api/authentication/login", userData);
    // return axios.post("api/signup", userData);
  },
  getRecentPhotos: function(){
    return axios.get("/api/photos/recent")

  }
};
