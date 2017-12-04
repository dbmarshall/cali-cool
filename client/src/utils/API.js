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
    return axios.post("/api/authentication/login", userData);
  },

  logout: function() {
    return axios.get("/api/authentication/logout");
  },

  getRecentPhotos: function(){
    return axios.get("/api/photos/recent")
  },

  getUserAlbums: function(userId){
      console.log("utils/API route: /api/user/" + userId + "/albums");
    return axios.post("/api/user/" + userId + "/albums")
  },

  savePhoto: function(userId, photoData){
      console.log('utils/API userId: ', userId);
      console.log('utils/API photoData: ', photoData);
      console.log("utils/API route: /api/user/" + userId + "/photos/new");
    return axios.post("/api/user/" + userId + "/photos/new", photoData)
  }

};
