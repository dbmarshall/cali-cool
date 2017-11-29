import axios from "axios";

export default {
  // Hits API for articles
  //  (API Documentation: https://developer.nytimes.com)  
  apiArticles: function(topic, startYear, endYear) {
    let apikey = `24881b82f17b48b299e435dbc820ef19`;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apikey}&q=${topic}&begin_date=${startYear}0101&end_date=${endYear}1231&fl=web_url,headline,pub_date`;
    return axios.get(url)
      .then(res => {
        return res.data.response.docs;
      });
  },
  // Get all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Save an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  // Delete an article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Save a comment for a given article
  saveComment: function(commentData) {
    return axios.post("/api/articles/" + commentData.id, commentData);
  },
  // Delete an article with the given id
  deleteComment: function(id) {
    return axios.delete("/api/articles/comments/" + id);
  }
};
