import axios from "axios";

export default {
  
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
  },

  getRecentPhotos: function(){
    return axios.get("/api/photos/recent")
  },

  savePhoto: function(photoData){
      console.log('utils/API photoData: ', photoData);
    return axios.post("/api/photos/new", photoData)
  }

};
