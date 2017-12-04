const router = require("express").Router();
const albumsController = require("../../controllers/albumsController");

<<<<<<< HEAD
//Routes goes here 
router.route("/:id")
  .get(albumsController.findById);
=======
// Routes goes here — match with "/api/albums"

>>>>>>> 99aa17789ba38a824226bc2991634a8d15329bb8

module.exports = router;