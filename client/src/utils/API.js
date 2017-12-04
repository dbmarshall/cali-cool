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

  getUserAlbums: function(userId){
      console.log("utils/API getUserAlbums route: /api/users/" + userId + "/albums");
    return axios.get("/api/users/" + userId + "/albums")
  },

  createAlbum: function(userId, albumData){
      // console.log('utils/API userId: ', userId);
      console.log('utils/API createAlbum albumData: ', albumData);
      console.log("utils/API createAlbum route: /api/users/" + userId + "/albums/new");
    return axios.post("/api/users/" + userId + "/albums/new", albumData)
  },

  savePhoto: function(userId, photoData){
      // console.log('utils/API userId: ', userId);
      console.log('utils/API savePhoto photoData: ', photoData);
      console.log("utils/API savePhoto route: /api/users/" + userId + "/photos/new");
    return axios.post("/api/users/" + userId + "/photos/new", photoData)
  }

};
