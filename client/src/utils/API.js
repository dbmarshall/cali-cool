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

  getMostLikedPhotos: function(){
    return axios.get("/api/photos/mostLiked")
  },

  getAlbumById: function(albumId){
    return axios.get("/api/albums/" + albumId)
  },

  getUserAlbums: function(userId){
      // console.log("utils/API getUserAlbums route: /api/users/" + userId + "/albums");
    return axios.get("/api/users/" + userId + "/albums")
  },

  createAlbum: function(userId, albumData){
    return axios.post("/api/users/" + userId + "/albums/new", albumData)
  },

  updateAlbumPhoto: function(userId, albumId, photoId){
      // console.log('utils/API updateAlbumPhoto userId: ', userId);
      // console.log('utils/API updateAlbumPhoto albumId: ', albumId);
      console.log("utils/API updateAlbumPhoto route: /api/users/" + userId + "/albums/" + albumId);
    return axios.post("/api/users/" + userId + "/albums/" + albumId, photoId)
  },

  savePhoto: function(userId, photoData){
    return axios.post("/api/users/" + userId + "/photos/new", photoData)
  }
};
