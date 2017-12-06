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
      // console.log("utils/API updateAlbumPhoto route: /api/users/" + userId + "/albums/" + albumId);
    return axios.post("/api/users/" + userId + "/albums/" + albumId, photoId)
  },

  savePhoto: function(userId, photoData){
      // console.log('utils/API savePhoto photoData: ', photoData);
    return axios.post("/api/users/" + userId + "/photos/new", photoData)
  },

  getSinglePhotoData: function(photoId) {
    // console.log(photoId)
    return axios.get("/api/photos/" + photoId.id)
  },

  getUserProfileData: function(userId) {
    // console.log(userId.id)
    return axios.get("/api/users/" + userId.id);
  },

  deletePhoto: function(photoId) {
    // console.log(photoId)
    return axios.delete("/api/photos/" + photoId)
  },

  createPhotoComment: function(commentData) {
    console.log(commentData);
    return axios.post("/api/users/" + commentData.userId + "/comments", commentData )
  },

  insertCommentToPhoto: function(commentData) {
    console.log(commentData)
    return axios.post("/api/photos/" + commentData.photoId + "/comments", commentData)
  },

  getComments: function(photoId) {
    console.log(photoId)
    return axios.get("/api/photos/" + photoId.id + "/comments")
  },

  likePhoto: function(userId, photoId){
    return axios.post("/api/users/" + userId + "/photos/" + photoId + "/like");
  },

  unlikePhoto: function(userId, photoId){
    return axios.put("/api/users/" + userId + "/photos/" + photoId + "/like");
  },

  likeAlbum: function(userId, albumId){
    return axios.post("/api/users/" + userId + "/albums/" + albumId + "/like");
  },

  unlikeAlbum: function(userId, albumId){
    return axios.put("/api/users/" + userId + "/albums/" + albumId + "/like");
  }
};
