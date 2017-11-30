const path = require("path");
const router = require("express").Router();

module.exports = function(router, passport) {

  router.post("/api/signup", function(req,res) {
    console.log(req.body);
    res.send("route hit today")
  })


  router.use(function(req, res) {
    // res.sendFile(path.join(__dirname, "../client/build/index.html"));
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });
}