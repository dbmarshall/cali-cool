import axios from "axios";

export default {  

  signUpUser: function(userData) {
    return axios.post("api/signup", userData);
  },

  getRecentPhotos: function(){
    return axios.get("/api/photos/recent")
  },

  savePhoto: function(photoData){
      console.log('utils/API photoData: ', photoData);
    return axios.post("/api/photos/new", photoData)
  }

};

// axios.put(url, imageFile, {
//   headers: {
//     'Content-Type': imageFile.type
//   }
// });
